document.addEventListener('DOMContentLoaded', () => {
    // Extract product name from URL
    const pathParts = window.location.pathname.split('/');
    const productID = decodeURIComponent(pathParts[pathParts.length - 1]);
    fetch(`/trade/getProductById?product_id=${productID}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.querySelector('title').innerText = data.product_name;

        // Fetch and display product information based on `productName`
        // For demonstration, we'll just set the content to productName
        document.getElementById('product-content').innerHTML = `<h1>${data.product_name}</h1>`;
    });
    
    
    // You would typically fetch data from an API or server here
});