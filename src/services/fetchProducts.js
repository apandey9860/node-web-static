document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and display products
    function loadProducts() {
        fetch('/trade/getAllProductDetails')  // Update the endpoint as needed
            .then(response => response.json())
            .then(data => {
                const productCardsContainer = document.getElementById('productCardsContainer');
                productCardsContainer.innerHTML = ''; // Clear existing content
                
                data.forEach(product => {
                    const cardHTML = `
                        <div class="col-md-4 mb-4">
                            <div class="card" data-id="${product.product_id}">
                                <img src="${product.picture_data}" class="card-img-top" alt="${product.product_name}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.product_name}</h5>
                                    <p class="card-text">${product.short_description}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    productCardsContainer.innerHTML += cardHTML;
                });
                addCardClickEvents(); // Add click events after cards are added
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    function addCardClickEvents() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                console.log(card);
                const productId = card.getAttribute('data-id');
                window.location.href = `/product/${productId}`;
            });
        });
    }

    loadProducts();
});
