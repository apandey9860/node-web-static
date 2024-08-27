document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#addProductForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        var picData = this.pictureURL.files[0];
        const pic = picData.name;
        console.log(picData.name.split('.')[0]);
        const picName = picData.name.split('.')[0];


        //Code to store the picture locally in the format (/images/trade/products/picName/pic)
        const dynamicPath = `images/products/t_products/${picName}`;
        console.log(dynamicPath);
        const formData = new FormData();
        const pathData = {
            uploadPath: dynamicPath
        }
        formData.append('pathData', JSON.stringify(pathData));
        formData.append('picture', picData);


        const productData = {
            p_product_name: this.productName.value,
            p_product_price: this.productPrice.value,
            p_product_short_desc: this.productShortDesc.value,
            p_product_desc: this.productDesc.value,
            p_category_id: this.category.value,
            p_prod_pic_name: picName,
            p_prod_pic_data: dynamicPath+'/'+pic
        };

        

        fetch('/trade/addProduct', {
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
                $('#addProductModal').modal('hide');
                fetchProductData();
                setTimeout(() => {
                    alert('Added Product');
                }, 1000);
                console.log('Success:', data)})
            .catch((error) => console.error('Error:', error));            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
