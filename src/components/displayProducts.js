function fetchProductData() {
    fetch('/trade/getAllProductDetails')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#productTableBody');
            tbody.innerHTML = ''; // Clear existing rows

            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><span class="custom-checkbox"><input type="checkbox" class="select-product" value="${product.product_id}"><label></label></span></td>
                    <td>${product.product_name}</td>
                    <td>${product.product_short_desc}</td>
                    <td><img src="${product.prod_pic_data}" alt="${product.product_name}" style="width: 50px;"></td>
                    <td>${product.category_name}</td>
                    <td>
                        <a href="#editProductModal" class="edit" data-toggle="modal" data-id="${product.product_id}"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a href="#deleteProductModal" class="delete" data-toggle="modal" data-id="${product.product_id}"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                    </td>
                `;
                tbody.appendChild(row);
            });

            document.querySelectorAll('.edit').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    // Fetch product details and populate the edit form
                });
            });

            document.querySelectorAll('.delete').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    document.querySelector('#deleteProductForm [name="productId"]').value = productId;
                });
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Call fetchProductData initially to populate the table
fetchProductData();
