function deleteRepairProductBtnClick(){
    console.log("Delete Repair product 2");
    const button = event.target.closest('button');
    const productId = button.getAttribute('data-id');
    const prodID = parseInt(productId);
    console.log("delete Repair ====")
    const productData = {
        product_id: prodID
    }
    var modal = document.getElementById('deleteRepairProductModal');
    console.log(modal);
    if (modal) {
        // Show the modal
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
    }
    document.querySelector('#deleteRepairProductForm').addEventListener('submit', function(event) {
        event.preventDefault();

        fetch(`/repair/deleteProduct`, {
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