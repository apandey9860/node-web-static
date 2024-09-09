document.addEventListener('DOMContentLoaded', function() {
    // Load content from header, footer, and sections
    const sections = ['repairProduct'];
    sections.forEach(section => {
        fetch(`../views/${section}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById(`${section}`).innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${section}:`, error));
    });
});