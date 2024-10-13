document.addEventListener('DOMContentLoaded', function() {
    // Load the modal HTML from an external file
    fetch('modal.html')
        .then(response => response.text())
        .then(data => {
            // Inject the modal HTML into the modal-container div
            document.getElementById('modal-container').innerHTML = data;

            // Now that the modal is injected, set up the modal behavior
            setupModalFunctionality();
        })
        .catch(error => console.error('Error loading modal:', error));
});

function setupModalFunctionality() {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");

    // Get all images with the class "modal-trigger"
    var images = document.querySelectorAll(".modal-trigger");

    images.forEach(function(image) {
        image.addEventListener("click", function() {
            modal.style.display = "flex";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    // Get the <p> element that closes the modal
    var closeBtn = document.querySelector(".close");

    // When the user clicks on <p> (close), close the modal
    closeBtn.onclick = function() { 
        modal.style.display = "none";
    }

    // Close modal when clicking outside the modal image
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}
