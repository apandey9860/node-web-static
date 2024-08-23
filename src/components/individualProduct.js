document.addEventListener('DOMContentLoaded', () => {
    // Extract product name from URL
    const pathParts = window.location.pathname.split('/');
    const productName = decodeURIComponent(pathParts[pathParts.length - 1]);

    document.querySelector('title').innerText = productName;

    // Fetch and display product information based on `productName`
    // For demonstration, we'll just set the content to productName
    document.getElementById('product-content').innerHTML = `<h1>${productName}</h1>`;
    
    // You would typically fetch data from an API or server here
});