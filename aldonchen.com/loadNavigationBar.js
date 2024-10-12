document.addEventListener('DOMContentLoaded', function() {
    fetch('navigation.html')
       .then(response => response.text())
       .then(data => {
          const navPlaceholder = document.getElementById('navigation-bar');
          navPlaceholder.innerHTML = data;

          // Optionally trigger a layout reflow after insertion
          navPlaceholder.offsetHeight; // Forces reflow
       })
       .catch(error => console.error('Error loading the navigation:', error));
 });