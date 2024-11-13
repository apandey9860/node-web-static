document.addEventListener('DOMContentLoaded', function () {
    const addProductForm = document.getElementById('addProductForm');
    const imageUploadBox = document.getElementById('imageUploadBox');
    const fileInput = document.getElementById('fileInput');
    const browseButton = document.getElementById('browseButton');
    const modal = document.getElementById('myModal');

    let productImage = null;

    if (!addProductForm || !imageUploadBox || !fileInput || !browseButton) {
        console.error("Required elements not found");
        return;
    }

    // Attach event listener for file input
    fileInput.addEventListener('change', handleImageUpload);

    // Handle form submission
    addProductForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const productName = addProductForm.productName.value.trim();
        const productCategory = addProductForm.productCategory.value.trim();
        const productPrice = parseFloat(addProductForm.productPrice.value);
        const productShortDesc = addProductForm.productShortDesc.value.trim();
        const productDesc = addProductForm.productDesc.value.trim();

        if (!productName || !productCategory || isNaN(productPrice) || !productShortDesc || !productDesc) {
            alert("Please fill in all required fields.");
            return;
        }

        if (!productImage) {
            alert("Please upload a product image.");
            return;
        }

        const picName = productImage.name.split('.')[0];
        const dynamicPath = `images/products/t_products/${picName}`;

        const formData = new FormData();
        const productData = {
            p_product_name: productName,
            p_category_id: productCategory,
            p_product_price: productPrice,
            p_product_short_desc: productShortDesc,
            p_product_desc: productDesc,
            p_prod_pic_name: productImage.name,
            p_prod_pic_data: `${dynamicPath}/${productImage.name}`
        };

        formData.append('picture', productImage);
        formData.append('pathData', JSON.stringify({ uploadPath: dynamicPath }));
        formData.append('productData', JSON.stringify(productData));

        try {
            // Step 1: Upload the image
            const uploadResponse = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            const uploadResult = await uploadResponse.json();
            if (!uploadResponse.ok) {
                throw new Error(uploadResult.message || 'Image upload failed');
            }

            // Step 2: Save the product data
            const saveResponse = await fetch('/trade/addProduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            const saveResult = await saveResponse.json();
            if (!saveResponse.ok) {
                throw new Error(saveResult.message || 'Product save failed');
            }

            alert("Product successfully added!");

            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }

            addProductForm.reset();
            resetImageUpload();
            fetchProductData();

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Handle image upload
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            productImage = file;
            const reader = new FileReader();
            reader.onload = function (e) {
                displayImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function displayImagePreview(imageSrc) {
        if (imageUploadBox) {
            imageUploadBox.innerHTML = `<img src="${imageSrc}" alt="Product Image" class="uploaded-image">`;
        }
    }

    function resetImageUpload() {
        productImage = null;
        fileInput.value = ''; // Clear the file input field
        if (imageUploadBox) {
            imageUploadBox.innerHTML = `
                <p>Drag image here or <br><button type="button" id="browseButton">Browse Image</button></p>
            `;
        }

        // Reattach the click event listener for the browse button
        const newBrowseButton = document.getElementById('browseButton');
        newBrowseButton.addEventListener('click', () => fileInput.click());
    }

    browseButton.addEventListener('click', () => fileInput.click());
});
