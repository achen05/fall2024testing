document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        // Toggle the active class on the header
        header.classList.toggle('active');

        // Get the associated content
        const content = header.nextElementSibling;

        // Toggle the display of the content
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});
