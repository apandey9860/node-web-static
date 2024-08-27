document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#addProductForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const productData = {
            p_product_name: this.productName.value,
            p_product_price: this.productPrice.value,
            p_product_short_desc: this.productShortDesc.value,
            p_product_desc: this.productDesc.value,
            p_category_id: this.category.value,
            p_prod_pic_name: this.productPicName.value,
            p_prod_pic_data: this.pictureURL.value
        };

        fetch('/trade/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        .then(data => {
            $('#addProductModal').modal('hide');
            fetchProductData();
            setTimeout(() => {
                alert('Added Product');
            }, 1000);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
