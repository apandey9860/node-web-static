document.addEventListener('DOMContentLoaded', function() {
    // Load content from header, footer, and sections
    const sections = ['footer'];
    sections.forEach(section => {
        fetch(`../views/${section}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById(`${section}Index`).innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${section}:`, error));
    });
});