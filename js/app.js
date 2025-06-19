// js/app.js

/**
 * Initializes global application functionalities.
 * This can include setting up event listeners for non-React elements, etc.
 */
function initializeApp() {
  console.log("Brake Bias App Initialized.");

  // Example: Add a smooth scroll behavior to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

// Ensure the DOM is fully loaded before running the script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}