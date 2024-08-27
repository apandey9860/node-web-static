document.addEventListener('DOMContentLoaded', function() {
    // Using event delegation for dynamically added edit buttons
    document.querySelector('.table-wrapper').addEventListener('click', function(event) {
        // Check if the clicked element has class 'edit'
        if (event.target.closest('.edit')) {
            const button = event.target.closest('.edit');
            const productId = button.getAttribute('data-id');
            const prodID = parseInt(productId);

            fetch(`/trade/getProductById?product_id=${prodID}`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(product => {
                console.log(product);
                if (product) {
                    // Populate the modal fields with the fetched product data
                    document.querySelector('#editProductModal [name="productName"]').value = product.product_name || '';
                    document.querySelector('#editProductModal [name="productPrice"]').value = product.product_price || '';
                    document.querySelector('#editProductModal [name="productShortDesc"]').value = product.short_description || '';
                    document.querySelector('#editProductModal [name="productDesc"]').value = product.full_description || '';
                    document.querySelector('#editProductModal [name="category"]').value = product.category_name || '';
                    document.querySelector('#editProductModal [name="category"]').setAttribute('data-category-id', product.category_id || '');
                    document.querySelector('#editProductModal [name="productPicName"]').value = product.picture_name || '';
                    document.querySelector('#editProductModal [name="pictureURL"]').value = product.picture_data || '';
                    document.querySelector('#editProductModal [name="productId"]').value = product.product_id || '';

                    // Show the modal
                    $('#editProductModal').modal('show');
                }
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
        }
    });

    //Submit
    document.querySelector('#editProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const productData = {
            p_product_name: this.productName.value,
            p_product_price: this.productPrice.value,
            p_product_short_desc: this.productShortDesc.value,
            p_product_desc: this.productDesc.value,
            p_category_id: parseInt(this.category.getAttribute('data-category-id')),
            p_prod_pic_name: this.productPicName.value,
            p_prod_pic_data: this.pictureURL.value,
            p_product_id: parseInt(this.productId.value)
        };

        fetch('/trade/updateProduct', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        .then(data => {
            $('#editProductModal').modal('hide');
            fetchProductData();            
            alert('Updated Product');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
