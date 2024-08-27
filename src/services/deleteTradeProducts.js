document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#deleteProductForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const productId = this.productId.value;
        const prodID = parseInt(productId);
        const productData = {
            product_id: prodID
        }

        fetch(`/trade/deleteProduct`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        .then(data => {
            $('#deleteProductModal').modal('hide');
            fetchProductData();
            alert('Deleted Product');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
