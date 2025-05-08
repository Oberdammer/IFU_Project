// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Navigation buttons - using touchend for better mobile experience
  const buttonSelectors = [
    '.button-grid button:first-child',
    '.button-grid button:nth-child(2)',
    '.button-grid button:nth-child(3)',
    '.button-grid button:nth-child(4)'
  ];
  
  const destinations = [
    'h_delivery.html',
    'h_banking.html',
    'h_postal.html',
    'h_charging.html'
  ];
  
  // Add event listeners to all buttons
  buttonSelectors.forEach((selector, index) => {
    const button = document.querySelector(selector);
    if (button) {
      // Add both click and touchend events for cross-device compatibility
      ['click', 'touchend'].forEach(eventType => {
        button.addEventListener(eventType, function(event) {
          // Prevent default behavior to avoid double-triggering
          event.preventDefault();
          window.location.href = destinations[index];
        });
      });
    }
  });
  
  // Better orientation detection for mobile devices
  function checkOrientation() {
    const warning = document.getElementById("orientation-warning");
    if (!warning) return;
    
    // Use screen orientation API if available (more reliable)
    if (window.screen && window.screen.orientation) {
      const orientation = window.screen.orientation.type;
      warning.style.display = orientation.includes('portrait') ? "block" : "none";
    } 
    // Fallback to dimension comparison
    else {
      warning.style.display = window.innerHeight > window.innerWidth ? "block" : "none";
    }
  }
  
  // Check orientation on page load
  checkOrientation();
  
  // Add event listeners for orientation changes
  window.addEventListener("resize", checkOrientation);
  
  if (window.screen && window.screen.orientation) {
    // Modern API for orientation changes
    window.screen.orientation.addEventListener("change", checkOrientation);
  } else {
    // Fallback for older devices
    window.addEventListener("orientationchange", checkOrientation);
  }
});
