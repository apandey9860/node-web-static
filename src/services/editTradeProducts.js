// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('openTradeProductBtn').addEventListener('click', function(event){
//         document.getElementById('openTradeProductBtn').addEventListener('contentloaded')
//         console.log(document.getElementById("editProductBtn"));
//         // document.getElementById('addTrade').addEventListener('click', function(event){
//         //     var modal = document.getElementById('addProductModal');
//         //     if (modal) {
//         //         // Show the modal
//         //         modal.style.display = 'block';
//         //         modal.setAttribute('aria-hidden', 'false');
//         //     }
//         //     document.querySelector('#addProductForm').addEventListener('submit', function(event) {
//         //         event.preventDefault(); 
        
//         //         var picData = this.pictureURL.files[0];
//         //         const pic = picData.name;
//         //         const picName = picData.name.split('.')[0];
        
        
//         //         //Code to store the picture locally in the format (/images/trade/products/picName/pic)
//         //         const dynamicPath = `images/products/t_products/${picName}`;
//         //         const formData = new FormData();
//         //         const pathData = {
//         //             uploadPath: dynamicPath
//         //         }
//         //         formData.append('pathData', JSON.stringify(pathData));
//         //         formData.append('picture', picData);
        
        
//         //         const productData = {
//         //             p_product_name: this.productName.value,
//         //             p_product_price: this.productPrice.value,
//         //             p_product_short_desc: this.productShortDesc.value,
//         //             p_product_desc: this.productDesc.value,
//         //             p_category_id: this.category.value,
//         //             p_prod_pic_name: picName,
//         //             p_prod_pic_data: dynamicPath+'/'+pic
//         //         };
        
                
        
//         //         fetch('/trade/addProduct', {
//         //             method: 'POST',
//         //             headers: {
//         //                 'Content-Type': 'application/json',
//         //             },
//         //             body: JSON.stringify(productData),
//         //         })
//         //         .then(data => {
//         //             // Send the data to the server
//         //             fetch('/upload', {
//         //                 method: 'POST',
//         //                 body: formData,
//         //             })
//         //             .then(response => response.json())
//         //             .then(data => {
//         //                 modal.style.display = 'none';
//         //                 modal.setAttribute('aria-hidden', 'true');
//         //                 fetchProductData();
//         //             })
//         //             .catch((error) => console.error('Error:', error));            
//         //         })
//         //         .catch((error) => {
//         //             console.error('Error:', error);
//         //         });
//         //     });
//         //     document.getElementById("cancelTradeAdd").addEventListener('click', function(event){
//         //         modal.style.display = 'none';
//         //         modal.setAttribute('aria-hidden', 'true');
//         //     });           

//         // });
//     });

//     // // Using event delegation for dynamically added edit buttons
//     // document.querySelector('.table-wrapper').addEventListener('click', function(event) {
//     //     // Check if the clicked element has class 'edit'
//     //     if (event.target.closest('.edit')) {
//     //         const button = event.target.closest('.edit');
//     //         const productId = button.getAttribute('data-id');
//     //         const prodID = parseInt(productId);

//     //         fetch(`/trade/getProductById?product_id=${prodID}`, {
//     //             method: 'GET'
//     //         })
//     //         .then(response => response.json())
//     //         .then(product => {
//     //             console.log(product);
//     //             if (product) {
//     //                 // Populate the modal fields with the fetched product data
//     //                 document.querySelector('#editProductModal [name="productName"]').value = product.product_name || '';
//     //                 document.querySelector('#editProductModal [name="productPrice"]').value = product.product_price || '';
//     //                 document.querySelector('#editProductModal [name="productShortDesc"]').value = product.short_description || '';
//     //                 document.querySelector('#editProductModal [name="productDesc"]').value = product.full_description || '';
//     //                 document.querySelector('#editProductModal [name="category"]').value = product.category_name || '';
//     //                 document.querySelector('#editProductModal [name="category"]').setAttribute('data-category-id', product.category_id || '');
//     //                 document.querySelector('#editProductModal [name="productPicName"]').value = product.picture_name || '';
//     //                 document.querySelector('#editProductModal [name="pictureURL"]').value = product.picture_data || '';
//     //                 document.querySelector('#editProductModal [name="productId"]').value = product.product_id || '';

//     //                 // Show the modal
//     //                 $('#editProductModal').modal('show');
//     //             }
//     //         })
//     //         .catch((error) => {
//     //             console.error('Error fetching product:', error);
//     //         });
//     //     }
//     // });

//     // //Submit
//     // document.querySelector('#editProductForm').addEventListener('submit', function(event) {
//     //     event.preventDefault();
//     //     const productData = {
//     //         p_product_name: this.productName.value,
//     //         p_product_price: this.productPrice.value,
//     //         p_product_short_desc: this.productShortDesc.value,
//     //         p_product_desc: this.productDesc.value,
//     //         p_category_id: parseInt(this.category.getAttribute('data-category-id')),
//     //         p_prod_pic_name: this.productPicName.value,
//     //         p_prod_pic_data: this.pictureURL.value,
//     //         p_product_id: parseInt(this.productId.value)
//     //     };

//     //     fetch('/trade/updateProduct', {
//     //         method: 'PUT',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify(productData),
//     //     })
//     //     .then(data => {
//     //         $('#editProductModal').modal('hide');
//     //         fetchProductData();            
//     //         alert('Updated Product');
//     //     })
//     //     .catch((error) => {
//     //         console.error('Error:', error);
//     //     });
//     // });
// });

function editProductBtnClick(event){
    
    const button = event.target.closest('button');
    const productId = button.getAttribute('data-id');
    const prodID = parseInt(productId);
    var modal = document.getElementById('editProductModal');
    if (modal) {
        // Show the modal
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
    }

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
        }
    })
    .catch((error) => {
        console.error('Error fetching product:', error);
    });
    document.getElementById("cancelTradeEdit").addEventListener('click', function(event){
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
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
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            fetchProductData();            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}