/**
 * Medallia Configuration File
 * 
 * This file contains configuration and placeholder scripts for:
 * - Medallia Digital Feedback
 * - Medallia DXA (Digital Experience Analytics)
 * 
 * To integrate Medallia:
 * 1. Add your Medallia Digital Feedback script in the HEAD section of public/index.html
 *    (Replace the comment: %%MEDALLIA_DIGITAL_FEEDBACK_HEAD%%)
 * 
 * 2. Add your Medallia DXA script at the end of the BODY in public/index.html
 *    (Replace the comment: %%MEDALLIA_DXA_SCRIPT%%)
 * 
 * 3. Use the window variables documented in WINDOW_VARIABLES.md for custom triggers
 */

// Medallia configuration object
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
