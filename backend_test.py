import requests
import sys
import json
from datetime import datetime

class HFashionAPITester:
    def __init__(self, base_url="https://muted-ecommerce.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        if not headers:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                return True, response.json() if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.content:
                    try:
                        error_detail = response.json()
                        print(f"   Error: {error_detail}")
                    except:
                        print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'endpoint': endpoint,
                    'response': response.text[:500] if response.content else 'No response'
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e),
                'endpoint': endpoint
            })
            return False, {}

    def test_basic_connectivity(self):
        """Test basic API connectivity"""
        print("\n=== TESTING BASIC CONNECTIVITY ===")
        return self.run_test("API Root", "GET", "", 200)

    def test_database_seeding(self):
        """Test database seeding"""
        print("\n=== TESTING DATABASE SEEDING ===")
        return self.run_test("Database Seeding", "POST", "seed", 200)

    def test_products_api(self):
        """Test products endpoints"""
        print("\n=== TESTING PRODUCTS API ===")
        
        # Get all products
        success, products = self.run_test("Get All Products", "GET", "products", 200)
        if not success:
            return False
        
        if not products or len(products) == 0:
            print("❌ No products found after seeding")
            return False
        
        product_id = products[0]['id'] if products else None
        print(f"   Found {len(products)} products")
        
        # Get products by category
        categories = ['women', 'men', 'accessories', 'new-arrivals']
        for category in categories:
            self.run_test(f"Get {category} Products", "GET", f"products?category={category}", 200)
        
        # Get featured products
        self.run_test("Get Featured Products", "GET", "products?featured=true", 200)
        
        # Get trending products
        self.run_test("Get Trending Products", "GET", "products?trending=true", 200)
        
        # Test sorting
        self.run_test("Sort by Price Ascending", "GET", "products?sort=price_asc", 200)
        self.run_test("Sort by Price Descending", "GET", "products?sort=price_desc", 200)
        self.run_test("Sort by Newest", "GET", "products?sort=newest", 200)
        
        # Get single product
        if product_id:
            success, product = self.run_test("Get Single Product", "GET", f"products/{product_id}", 200)
            if success:
                print(f"   Product: {product.get('name', 'Unknown')} - ${product.get('price', 0)}")
        
        # Test non-existent product
        self.run_test("Get Non-existent Product", "GET", "products/invalid-id", 404)
        
        return True

    def test_cart_api(self):
        """Test cart endpoints"""
        print("\n=== TESTING CART API ===")
        
        # Get empty cart
        success, cart = self.run_test("Get Cart", "GET", "cart", 200)
        if not success:
            return False
        
        # Get a product first
        success, products = self.run_test("Get Products for Cart Test", "GET", "products", 200)
        if not success or not products:
            print("❌ Cannot test cart without products")
            return False
        
        product = products[0]
        product_id = product['id']
        
        # Add item to cart
        add_data = {
            "product_id": product_id,
            "quantity": 2,
            "size": product.get('sizes', [None])[0] if product.get('sizes') else None,
            "color": product.get('colors', [None])[0] if product.get('colors') else None
        }
        
        success, cart = self.run_test("Add to Cart", "POST", "cart/add", 200, add_data)
        if success:
            print(f"   Cart total: ${cart.get('total', 0)}")
            print(f"   Cart items: {len(cart.get('items', []))}")
        
        # Update cart item quantity
        update_data = {"quantity": 3}
        self.run_test("Update Cart Item", "PUT", f"cart/item/{product_id}", 200, update_data)
        
        # Get updated cart
        success, cart = self.run_test("Get Updated Cart", "GET", "cart", 200)
        if success:
            print(f"   Updated cart total: ${cart.get('total', 0)}")
        
        # Remove item from cart
        self.run_test("Remove Cart Item", "DELETE", f"cart/item/{product_id}", 200)
        
        # Clear cart
        self.run_test("Clear Cart", "DELETE", "cart", 200)
        
        return True

    def test_user_api(self):
        """Test user endpoints"""
        print("\n=== TESTING USER API ===")
        
        # Get demo user
        success, user = self.run_test("Get Demo User", "GET", "user", 200)
        if success:
            print(f"   User: {user.get('name', 'Unknown')} ({user.get('email', 'no-email')})")
        
        # Update user (optional parameters)
        update_data = {"name": "Updated Demo User"}
        self.run_test("Update User", "PUT", "user?name=Updated Demo User", 200)
        
        return True

    def test_orders_api(self):
        """Test orders endpoints"""
        print("\n=== TESTING ORDERS API ===")
        
        # First, add items to cart for order creation
        success, products = self.run_test("Get Products for Order Test", "GET", "products", 200)
        if not success or not products:
            print("❌ Cannot test orders without products")
            return False
        
        product = products[0]
        add_data = {
            "product_id": product['id'],
            "quantity": 1,
            "size": product.get('sizes', [None])[0] if product.get('sizes') else None,
            "color": product.get('colors', [None])[0] if product.get('colors') else None
        }
        
        # Add to cart first
        success, cart = self.run_test("Add to Cart for Order", "POST", "cart/add", 200, add_data)
        if not success:
            print("❌ Cannot create order without items in cart")
            return False
        
        # Create order
        shipping_data = {
            "shipping_address": {
                "first_name": "Demo",
                "last_name": "User",
                "address": "123 Test Street",
                "city": "Test City",
                "state": "CA",
                "zip_code": "12345",
                "phone": "555-0123"
            }
        }
        
        success, order = self.run_test("Create Order", "POST", "orders", 200, shipping_data)
        if success:
            order_id = order.get('id')
            print(f"   Order Number: {order.get('order_number')}")
            print(f"   Order Total: ${order.get('total', 0)}")
            print(f"   Order Status: {order.get('status')}")
            
            # Get single order
            if order_id:
                self.run_test("Get Single Order", "GET", f"orders/{order_id}", 200)
        
        # Get all orders
        success, orders = self.run_test("Get All Orders", "GET", "orders", 200)
        if success:
            print(f"   Total orders: {len(orders)}")
        
        return True

    def run_comprehensive_test(self):
        """Run all tests"""
        print("🚀 Starting HFashion API Comprehensive Test")
        print(f"Base URL: {self.base_url}")
        print(f"Test time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Test basic connectivity first
        if not self.test_basic_connectivity():
            print("\n❌ CRITICAL: Cannot connect to API. Stopping tests.")
            return self.get_results()
        
        # Test database seeding
        self.test_database_seeding()
        
        # Test all endpoints
        self.test_products_api()
        self.test_cart_api()
        self.test_user_api()
        self.test_orders_api()
        
        return self.get_results()
    
    def get_results(self):
        """Get test results summary"""
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        
        print(f"\n📊 TEST RESULTS SUMMARY")
        print(f"Tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Tests failed: {len(self.failed_tests)}")
        print(f"Success rate: {success_rate:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['name']}")
                if 'error' in test:
                    print(f"    Error: {test['error']}")
                else:
                    print(f"    Expected: {test['expected']}, Got: {test['actual']}")
        
        return {
            'total_tests': self.tests_run,
            'passed': self.tests_passed,
            'failed': len(self.failed_tests),
            'success_rate': success_rate,
            'failed_tests': self.failed_tests
        }

def main():
    """Main test function"""
    tester = HFashionAPITester()
    results = tester.run_comprehensive_test()
    
    # Return exit code based on results
    if results['success_rate'] < 50:
        print("\n❌ CRITICAL: Less than 50% of tests passed")
        return 1
    elif results['failed'] > 0:
        print(f"\n⚠️  WARNING: {results['failed']} tests failed")
        return 1
    else:
        print("\n✅ ALL TESTS PASSED")
        return 0

if __name__ == "__main__":
    sys.exit(main())