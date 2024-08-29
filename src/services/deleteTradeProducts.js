function deleteProductBtnClick(){
    const button = event.target.closest('button');
    const productId = button.getAttribute('data-id');
    const prodID = parseInt(productId);
    const productData = {
        product_id: prodID
    }
    var modal = document.getElementById('deleteProductModal');
    console.log(modal);
    if (modal) {
        // Show the modal
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
    }
    document.querySelector('#deleteProductForm').addEventListener('submit', function(event) {
        event.preventDefault();

        fetch(`/trade/deleteProduct`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        .then(data => {
            if (modal) {
                // Show the modal
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
            fetchProductData();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
    
}