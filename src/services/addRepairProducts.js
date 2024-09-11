document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('openRepairProductBtn').addEventListener('click', function(event){
        document.getElementById('addRepair').addEventListener('click', function(event){
            var modal = document.getElementById('addProductModal');
            if (modal) {
                // Show the modal
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
            }
            document.querySelector('#addProductForm').addEventListener('submit', function(event) {
                event.preventDefault(); 
            
                var picData = this.pictureURL.files[0];
                const pic = picData.name;
                const picName = picData.name.split('.')[0];
            
                // Code to store the picture locally in the format (/images/trade/products/picName/pic)
                const dynamicPath = `images/products/r_products/${picName}`;
                const formData = new FormData();
                const pathData = {
                    uploadPath: dynamicPath
                };
                formData.append('pathData', JSON.stringify(pathData));
                formData.append('picture', picData);
            
                const productData = {
                    p_product_name: this.productName.value,
                    p_product_price: this.productPrice.value,
                    p_product_short_desc: this.productShortDesc.value,
                    p_product_desc: this.productDesc.value,
                    p_category_id: this.category.value,
                    p_prod_pic_name: picName,
                    p_prod_pic_data: dynamicPath + '/' + pic
                };
            
                fetch('/repair/addProduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData),
                })
                .then(data => {
                    // Send the data to the server
                    fetch('/upload', {
                        method: 'POST',
                        body: formData,
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Hide the modal
                        modal.style.display = 'none';
                        modal.setAttribute('aria-hidden', 'true');
                        
                        // Clear the form before loading new data
                        document.querySelector('#addProductForm').reset();
            
                        // Call fetchProductData to refresh product list
                        fetchProductData();
                    })
                    .catch((error) => console.error('Error:', error));            
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            });
            
            document.getElementById("cancelTradeAdd").addEventListener('click', function(event){
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            });           

        });
    });

    
    
});
