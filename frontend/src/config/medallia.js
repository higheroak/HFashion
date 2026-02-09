/**
 * ============================================================================
 * MEDALLIA & THIRD-PARTY SCRIPTS CONFIGURATION
 * ============================================================================
 * 
 * This file provides configuration for integrating:
 * - Medallia Digital Feedback
 * - Medallia DXA (Digital Experience Analytics)
 * - Any other third-party scripts
 * 
 * ============================================================================
 * HOW TO ADD YOUR SCRIPTS
 * ============================================================================
 * 
 * OPTION 1: Add scripts directly to public/index.html
 * --------------------------------------------------
 * Open /public/index.html and look for these placeholder comments:
 * 
 * In <head>:
 *   <!-- MEDALLIA DIGITAL FEEDBACK SCRIPT - Add your script here -->
 *   <!-- %%MEDALLIA_DIGITAL_FEEDBACK_HEAD%% -->
 * 
 * In <body> (at the end):
 *   <!-- MEDALLIA DXA SCRIPT - Add your script here -->
 *   <!-- %%MEDALLIA_DXA_SCRIPT%% -->
 * 
 * Replace the placeholder comments with your actual script tags.
 * 
 * OPTION 2: Use the scriptsConfig object below
 * --------------------------------------------------
 * Set enabled: true and add your script URLs/code to dynamically inject scripts.
 * 
 * ============================================================================
 * AVAILABLE TRACKING DATA
 * ============================================================================
 * 
 * All user activity is tracked in: window.hfashion
 * See WINDOW_VARIABLES.md for complete documentation.
 * 
 * Example access:
 *   window.hfashion.cartValue      // Current cart total
 *   window.hfashion.checkout       // Checkout status ('started', 'complete')
 *   window.hfashion.currentProduct // Currently viewed product
 * 
 * ============================================================================
 */

/**
 * Scripts Configuration Object
 * Set enabled: true and configure your scripts to auto-inject them
 */
export const scriptsConfig = {
  // Master switch - set to true when you have scripts to inject
  enabled: false,
  
  // Scripts to inject in <head>
  headScripts: [
    // Example Medallia Digital Feedback (uncomment and add your actual script)
    // {
    //   id: 'medallia-digital-feedback',
    //   type: 'inline', // 'inline' for script content, 'external' for src URL
    //   content: `
    //     (function() {
    //       // Your Medallia Digital Feedback initialization code
    //     })();
    //   `,
    // },
    // {
    //   id: 'medallia-external',
    //   type: 'external',
    //   src: 'https://your-medallia-script-url.js',
    //   async: true,
    // },
  ],
  
  // Scripts to inject at end of <body>
  bodyScripts: [
    // Example Medallia DXA (uncomment and add your actual script)
    // {
    //   id: 'medallia-dxa',
    //   type: 'inline',
    //   content: `
    //     (function() {
    //       // Your Medallia DXA initialization code
    //     })();
    //   `,
    // },
  ],
};

// Medallia-specific configuration
export const medalliaConfig = {
  // Enable/disable Medallia integration
  enabled: false,
  
  // Digital Feedback settings
  digitalFeedback: {
    // Add your Digital Feedback form IDs here
    formIds: {
      homepage: '',
      productPage: '',
      checkout: '',
      orderConfirmation: '',
      account: '',
    },
    // Trigger points for feedback prompts
    triggerPoints: [
      'product_view',
      'add_to_cart',
      'checkout_start',
      'checkout_complete',
      'order_tracking_view',
    ],
  },
  
  // DXA (Digital Experience Analytics) settings
  dxa: {
    // Session recording enabled
    sessionRecording: true,
    // Heatmaps enabled
    heatmaps: true,
    // Form analytics enabled
    formAnalytics: true,
    // Custom events to track
    customEvents: [
      'page_view',
      'product_view',
      'add_to_cart',
      'remove_from_cart',
      'cart_update',
      'checkout_start',
      'checkout_complete',
      'search',
      'filter_applied',
      'sort_applied',
    ],
  },
};

/**
 * Initialize Medallia tracking
 * Call this function after Medallia scripts are loaded
 */
export const initMedallia = () => {
  if (typeof window !== 'undefined') {
    // Initialize window tracking object if not exists
    window.hfashionTracking = window.hfashionTracking || {};
    
    console.log('[Medallia] Configuration loaded. Waiting for Medallia scripts.');
    console.log('[Medallia] See WINDOW_VARIABLES.md for available tracking variables.');
  }
};

/**
 * Trigger Medallia Digital Feedback survey
 * @param {string} surveyId - The survey/form ID to trigger
 */
export const triggerFeedbackSurvey = (surveyId) => {
  if (typeof window !== 'undefined' && window.KAMPYLE_ONSITE_SDK) {
    window.KAMPYLE_ONSITE_SDK.showForm(surveyId);
  } else {
    console.log('[Medallia] Digital Feedback SDK not loaded. Survey ID:', surveyId);
  }
};

/**
 * Send custom event to Medallia DXA
 * @param {string} eventName - Name of the event
 * @param {object} eventData - Additional event data
 */
export const trackDXAEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined') {
    // Store event for DXA pickup
    window.hfashionTracking = window.hfashionTracking || {};
    window.hfashionTracking.lastEvent = {
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
    };
    
    // If Medallia DXA is available, send the event
    if (window.MDIGITAL && window.MDIGITAL.trackEvent) {
      window.MDIGITAL.trackEvent(eventName, eventData);
    }
    
    console.log('[Medallia DXA] Event tracked:', eventName, eventData);
  }
};

export default medalliaConfig;
