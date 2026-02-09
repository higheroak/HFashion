from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="HFashion API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"

class ProductCategory(str, Enum):
    NEW_ARRIVALS = "new-arrivals"
    MEN = "men"
    WOMEN = "women"
    ACCESSORIES = "accessories"

# Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    original_price: Optional[float] = None
    category: ProductCategory
    image_url: str
    sizes: List[str] = []
    colors: List[str] = []
    stock: int = 10
    is_featured: bool = False
    is_trending: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CartItem(BaseModel):
    product_id: str
    name: str
    price: float
    quantity: int
    size: Optional[str] = None
    color: Optional[str] = None
    image_url: str

class Cart(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    items: List[CartItem] = []
    total: float = 0.0
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ShippingAddress(BaseModel):
    first_name: str
    last_name: str
    address: str
    city: str
    state: str
    zip_code: str
    country: str = "United States"
    phone: str

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_number: str = Field(default_factory=lambda: f"HF-{str(uuid.uuid4())[:8].upper()}")
    user_id: str
    items: List[CartItem]
    subtotal: float
    shipping: float = 9.99
    tax: float = 0.0
    total: float
    status: OrderStatus = OrderStatus.PENDING
    shipping_address: ShippingAddress
    tracking_number: Optional[str] = None
    estimated_delivery: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    avatar: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Request/Response Models
class AddToCartRequest(BaseModel):
    product_id: str
    quantity: int = 1
    size: Optional[str] = None
    color: Optional[str] = None

class UpdateCartItemRequest(BaseModel):
    quantity: int

class CreateOrderRequest(BaseModel):
    shipping_address: ShippingAddress

# Demo User ID (always logged in)
DEMO_USER_ID = "demo-user-001"

# Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to HFashion API"}

# Products Routes
@api_router.get("/products/search")
async def search_products(q: str = "", limit: int = 10):
    """Search products by name or description"""
    if not q or len(q) < 2:
        return []
    
    # Case-insensitive search in name and description
    query = {
        "$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}}
        ]
    }
    
    products = await db.products.find(query, {"_id": 0}).limit(limit).to_list(limit)
    
    for p in products:
        if isinstance(p.get('created_at'), str):
            p['created_at'] = datetime.fromisoformat(p['created_at'])
    
    return products

@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    sort: Optional[str] = None,
    featured: Optional[bool] = None,
    trending: Optional[bool] = None
):
    query = {}
    if category:
        query["category"] = category
    if featured:
        query["is_featured"] = True
    if trending:
        query["is_trending"] = True
    
    sort_field = {"price_asc": ("price", 1), "price_desc": ("price", -1), "newest": ("created_at", -1)}
    sort_option = sort_field.get(sort, ("created_at", -1))
    
    products = await db.products.find(query, {"_id": 0}).sort(sort_option[0], sort_option[1]).to_list(100)
    
    for p in products:
        if isinstance(p.get('created_at'), str):
            p['created_at'] = datetime.fromisoformat(p['created_at'])
    
    return products

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if isinstance(product.get('created_at'), str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    return product

# Cart Routes
@api_router.get("/cart", response_model=Cart)
async def get_cart():
    cart = await db.carts.find_one({"user_id": DEMO_USER_ID}, {"_id": 0})
    if not cart:
        cart = Cart(user_id=DEMO_USER_ID).model_dump()
        cart['updated_at'] = cart['updated_at'].isoformat()
        await db.carts.insert_one(cart)
        cart['updated_at'] = datetime.fromisoformat(cart['updated_at'])
    else:
        if isinstance(cart.get('updated_at'), str):
            cart['updated_at'] = datetime.fromisoformat(cart['updated_at'])
    return cart

@api_router.post("/cart/add", response_model=Cart)
async def add_to_cart(request: AddToCartRequest):
    # Get product
    product = await db.products.find_one({"id": request.product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Get or create cart
    cart = await db.carts.find_one({"user_id": DEMO_USER_ID}, {"_id": 0})
    if not cart:
        cart = Cart(user_id=DEMO_USER_ID).model_dump()
    
    # Check if item exists in cart
    item_exists = False
    items = cart.get('items', [])
    for item in items:
        if item['product_id'] == request.product_id and item.get('size') == request.size and item.get('color') == request.color:
            item['quantity'] += request.quantity
            item_exists = True
            break
    
    if not item_exists:
        new_item = CartItem(
            product_id=product['id'],
            name=product['name'],
            price=product['price'],
            quantity=request.quantity,
            size=request.size,
            color=request.color,
            image_url=product['image_url']
        )
        items.append(new_item.model_dump())
    
    # Calculate total
    total = sum(item['price'] * item['quantity'] for item in items)
    
    cart['items'] = items
    cart['total'] = round(total, 2)
    cart['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.carts.update_one(
        {"user_id": DEMO_USER_ID},
        {"$set": cart},
        upsert=True
    )
    
    cart['updated_at'] = datetime.fromisoformat(cart['updated_at'])
    return cart

@api_router.put("/cart/item/{product_id}", response_model=Cart)
async def update_cart_item(product_id: str, request: UpdateCartItemRequest):
    cart = await db.carts.find_one({"user_id": DEMO_USER_ID}, {"_id": 0})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    items = cart.get('items', [])
    item_found = False
    
    for item in items:
        if item['product_id'] == product_id:
            if request.quantity <= 0:
                items.remove(item)
            else:
                item['quantity'] = request.quantity
            item_found = True
            break
    
    if not item_found:
        raise HTTPException(status_code=404, detail="Item not in cart")
    
    total = sum(item['price'] * item['quantity'] for item in items)
    cart['items'] = items
    cart['total'] = round(total, 2)
    cart['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.carts.update_one(
        {"user_id": DEMO_USER_ID},
        {"$set": cart}
    )
    
    cart['updated_at'] = datetime.fromisoformat(cart['updated_at'])
    return cart

@api_router.delete("/cart/item/{product_id}", response_model=Cart)
async def remove_from_cart(product_id: str):
    cart = await db.carts.find_one({"user_id": DEMO_USER_ID}, {"_id": 0})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    items = [item for item in cart.get('items', []) if item['product_id'] != product_id]
    total = sum(item['price'] * item['quantity'] for item in items)
    
    cart['items'] = items
    cart['total'] = round(total, 2)
    cart['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.carts.update_one(
        {"user_id": DEMO_USER_ID},
        {"$set": cart}
    )
    
    cart['updated_at'] = datetime.fromisoformat(cart['updated_at'])
    return cart

@api_router.delete("/cart", response_model=dict)
async def clear_cart():
    await db.carts.update_one(
        {"user_id": DEMO_USER_ID},
        {"$set": {"items": [], "total": 0.0, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    return {"message": "Cart cleared"}

# Order Routes
@api_router.post("/orders", response_model=Order)
async def create_order(request: CreateOrderRequest):
    cart = await db.carts.find_one({"user_id": DEMO_USER_ID}, {"_id": 0})
    if not cart or not cart.get('items'):
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    subtotal = cart['total']
    shipping = 9.99 if subtotal < 100 else 0.0
    tax = round(subtotal * 0.08, 2)
    total = round(subtotal + shipping + tax, 2)
    
    # Generate tracking number and estimated delivery
    import random
    tracking_number = f"1Z{random.randint(100000000, 999999999)}"
    from datetime import timedelta
    estimated_delivery = (datetime.now(timezone.utc) + timedelta(days=random.randint(5, 10))).strftime("%B %d, %Y")
    
    order = Order(
        user_id=DEMO_USER_ID,
        items=cart['items'],
        subtotal=subtotal,
        shipping=shipping,
        tax=tax,
        total=total,
        shipping_address=request.shipping_address,
        tracking_number=tracking_number,
        estimated_delivery=estimated_delivery,
        status=OrderStatus.CONFIRMED
    )
    
    order_dict = order.model_dump()
    order_dict['created_at'] = order_dict['created_at'].isoformat()
    order_dict['updated_at'] = order_dict['updated_at'].isoformat()
    
    await db.orders.insert_one(order_dict)
    
    # Clear cart
    await db.carts.update_one(
        {"user_id": DEMO_USER_ID},
        {"$set": {"items": [], "total": 0.0, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    order_dict['created_at'] = datetime.fromisoformat(order_dict['created_at'])
    order_dict['updated_at'] = datetime.fromisoformat(order_dict['updated_at'])
    return order_dict

@api_router.get("/orders", response_model=List[Order])
async def get_orders():
    orders = await db.orders.find({"user_id": DEMO_USER_ID}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for order in orders:
        if isinstance(order.get('created_at'), str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
        if isinstance(order.get('updated_at'), str):
            order['updated_at'] = datetime.fromisoformat(order['updated_at'])
    return orders

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if isinstance(order.get('created_at'), str):
        order['created_at'] = datetime.fromisoformat(order['created_at'])
    if isinstance(order.get('updated_at'), str):
        order['updated_at'] = datetime.fromisoformat(order['updated_at'])
    return order

# User Routes
@api_router.get("/user", response_model=User)
async def get_user():
    user = await db.users.find_one({"id": DEMO_USER_ID}, {"_id": 0})
    if not user:
        # Create demo user
        user = User(
            id=DEMO_USER_ID,
            email="demo@hfashion.com",
            name="Demo User",
            avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        )
        user_dict = user.model_dump()
        user_dict['created_at'] = user_dict['created_at'].isoformat()
        await db.users.insert_one(user_dict)
        user_dict['created_at'] = datetime.fromisoformat(user_dict['created_at'])
        return user_dict
    
    if isinstance(user.get('created_at'), str):
        user['created_at'] = datetime.fromisoformat(user['created_at'])
    return user

@api_router.put("/user", response_model=User)
async def update_user(name: Optional[str] = None, email: Optional[str] = None):
    update_data = {}
    if name:
        update_data['name'] = name
    if email:
        update_data['email'] = email
    
    if update_data:
        await db.users.update_one(
            {"id": DEMO_USER_ID},
            {"$set": update_data}
        )
    
    user = await db.users.find_one({"id": DEMO_USER_ID}, {"_id": 0})
    if isinstance(user.get('created_at'), str):
        user['created_at'] = datetime.fromisoformat(user['created_at'])
    return user

# Seed Data Endpoint
@api_router.post("/seed")
async def seed_database():
    # Check if products exist
    count = await db.products.count_documents({})
    if count > 0:
        return {"message": "Database already seeded", "product_count": count}
    
    products = [
        # New Arrivals
        Product(name="Nordic Knit Cardigan", description="Cozy brown cardigan with elegant white nordic pattern. Perfect for layering in autumn and winter.", price=129.00, original_price=159.00, category=ProductCategory.NEW_ARRIVALS, image_url="https://images.unsplash.com/photo-1758981400268-1181291b9503?w=600&h=800&fit=crop", sizes=["XS", "S", "M", "L", "XL"], colors=["Brown", "Navy", "Cream"], is_featured=True, is_trending=True),
        Product(name="Sage Collar Sweater", description="Soft knit sweater with delicate collar detail. A timeless piece for any wardrobe.", price=89.00, category=ProductCategory.NEW_ARRIVALS, image_url="https://images.unsplash.com/photo-1764974345389-09da4244809c?w=600&h=800&fit=crop", sizes=["XS", "S", "M", "L"], colors=["Sage", "Ivory", "Blush"], is_featured=True),
        Product(name="Stacked Knit Collection", description="Set of layered knit sweaters in earth tones. Mix and match for endless styling options.", price=199.00, original_price=249.00, category=ProductCategory.NEW_ARRIVALS, image_url="https://images.unsplash.com/photo-1641642231157-0849081598a2?w=600&h=800&fit=crop", sizes=["S", "M", "L"], colors=["Multi"], is_trending=True),
        Product(name="Textured Knit Duo", description="Two-piece textured knit set in neutral tones. Elegant and comfortable.", price=159.00, category=ProductCategory.NEW_ARRIVALS, image_url="https://images.unsplash.com/photo-1603906650843-b58e94d9df4d?w=600&h=800&fit=crop", sizes=["XS", "S", "M", "L", "XL"], colors=["Taupe", "Olive"]),
        
        # Men's
        Product(name="Blue Pattern Kurta", description="Stylish blue patterned kurta with modern fit. Perfect for casual and semi-formal occasions.", price=79.00, category=ProductCategory.MEN, image_url="https://images.unsplash.com/photo-1634410251313-b65c51944ab3?w=600&h=800&fit=crop", sizes=["S", "M", "L", "XL", "XXL"], colors=["Blue", "Black"], is_featured=True),
        Product(name="Geometric Print Shirt", description="Bold geometric print shirt for the fashion-forward man. Stand out in any crowd.", price=69.00, original_price=89.00, category=ProductCategory.MEN, image_url="https://images.unsplash.com/photo-1629244032690-1c243449f90a?w=600&h=800&fit=crop", sizes=["S", "M", "L", "XL"], colors=["Multi"], is_trending=True),
        Product(name="Classic Three-Piece Suit", description="Timeless charcoal three-piece suit. Impeccable tailoring for the modern gentleman.", price=449.00, original_price=549.00, category=ProductCategory.MEN, image_url="https://images.unsplash.com/photo-1639747658423-1b00fee36582?w=600&h=800&fit=crop", sizes=["38", "40", "42", "44", "46"], colors=["Charcoal", "Navy", "Black"], is_featured=True),
        Product(name="Terracotta Cord Jacket", description="Vintage-inspired corduroy jacket in warm terracotta. A statement piece for fall.", price=189.00, category=ProductCategory.MEN, image_url="https://images.unsplash.com/photo-1647613560920-9576ec9a4537?w=600&h=800&fit=crop", sizes=["S", "M", "L", "XL"], colors=["Terracotta", "Forest Green"]),
        
        # Women's
        Product(name="Sleeveless White Blouse", description="Crisp white sleeveless blouse with elegant draping. Essential for any wardrobe.", price=59.00, category=ProductCategory.WOMEN, image_url="https://images.unsplash.com/photo-1770294758906-c8762abb2c8b?w=600&h=800&fit=crop", sizes=["XS", "S", "M", "L"], colors=["White", "Ivory", "Blush"], is_featured=True),
        Product(name="Ribbed Knit Dress", description="Form-fitting ribbed dress with elegant side slit. Sophisticated and comfortable.", price=119.00, original_price=149.00, category=ProductCategory.WOMEN, image_url="https://images.unsplash.com/photo-1692611153844-7007544badd9?w=600&h=800&fit=crop", sizes=["XS", "S", "M", "L"], colors=["Cream", "Black", "Taupe"], is_trending=True),
        Product(name="City Sky Dress", description="Modern silhouette dress perfect for urban adventures. Effortlessly chic.", price=139.00, category=ProductCategory.WOMEN, image_url="https://images.unsplash.com/photo-1748587808724-f80748cf1af1?w=600&h=800&fit=crop", sizes=["XS", "S", "M", "L", "XL"], colors=["Sky Blue", "Charcoal"]),
        Product(name="Linen Maxi Dress", description="Flowing linen maxi dress with puff sleeves. Perfect for summer days.", price=159.00, original_price=199.00, category=ProductCategory.WOMEN, image_url="https://images.unsplash.com/photo-1764298493197-a1c1cce57800?w=600&h=800&fit=crop", sizes=["XS", "S", "M", "L"], colors=["Natural", "Sage", "Terracotta"], is_featured=True),
        
        # Accessories
        Product(name="Cream Leather Clutch", description="Elegant cream leather clutch with gold hardware. Perfect for evening occasions.", price=89.00, category=ProductCategory.ACCESSORIES, image_url="https://images.unsplash.com/photo-1713746834176-04c0069d6593?w=600&h=800&fit=crop", sizes=[], colors=["Cream", "Black", "Tan"], is_trending=True),
        Product(name="Statement Jewelry Set", description="Curated jewelry display featuring rings, necklaces, and bracelets.", price=149.00, original_price=189.00, category=ProductCategory.ACCESSORIES, image_url="https://images.unsplash.com/photo-1769162151973-a7f06583f1e2?w=600&h=800&fit=crop", sizes=[], colors=["Gold", "Silver"], is_featured=True),
        Product(name="Designer Sunglasses", description="Bold statement sunglasses with modern frames. UV protection with style.", price=129.00, category=ProductCategory.ACCESSORIES, image_url="https://images.unsplash.com/photo-1765146487752-cd00fe1aaf50?w=600&h=800&fit=crop", sizes=[], colors=["Black", "Tortoise"]),
        Product(name="Cognac Leather Belt", description="Premium leather belt with classic buckle. Timeless craftsmanship.", price=79.00, category=ProductCategory.ACCESSORIES, image_url="https://images.unsplash.com/photo-1649860359778-0bb95cb88ea9?w=600&h=800&fit=crop", sizes=["30", "32", "34", "36", "38"], colors=["Cognac", "Black"]),
        Product(name="Classic Leather Watch", description="Minimalist watch with black leather strap. Elegant timekeeping.", price=199.00, original_price=249.00, category=ProductCategory.ACCESSORIES, image_url="https://images.unsplash.com/photo-1631160246898-58192f971b5f?w=600&h=800&fit=crop", sizes=[], colors=["Black", "Brown"], is_featured=True),
        Product(name="Gold Statement Ring", description="Bold gold ring with modern geometric design. Make a statement.", price=69.00, category=ProductCategory.ACCESSORIES, image_url="https://images.unsplash.com/photo-1667284152823-0b07a791fb79?w=600&h=800&fit=crop", sizes=["5", "6", "7", "8"], colors=["Gold", "Rose Gold"]),
    ]
    
    for product in products:
        doc = product.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.products.insert_one(doc)
    
    # Create demo user
    user = User(
        id=DEMO_USER_ID,
        email="demo@hfashion.com",
        name="Demo User",
        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    )
    user_dict = user.model_dump()
    user_dict['created_at'] = user_dict['created_at'].isoformat()
    await db.users.insert_one(user_dict)
    
    return {"message": "Database seeded successfully", "product_count": len(products)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
