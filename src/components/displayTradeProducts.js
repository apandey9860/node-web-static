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
                    <td>${product.short_description}</td>
                    <td><img src="../${product.picture_data}" alt="${product.product_name}" style="width: 50px;"></td>
                    <td>${product.category_name}</td>
                    <td>
                        <button id="editProductBtn" class="edit-product-btn" data-toggle="modal" data-id="${product.product_id}"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></button>
                        <button id="deleteProductBtn" class="delete-product-btn" data-toggle="modal" data-id="${product.product_id}"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>
                    </td>
                `;
                tbody.appendChild(row);
            });

             // Attach event listeners to dynamically added buttons
             document.querySelectorAll('.edit-product-btn').forEach(button => {
                button.addEventListener('click', editProductBtnClick);
            });

            document.querySelectorAll('.delete-product-btn').forEach(button => {
                button.addEventListener('click', deleteProductBtnClick);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Call fetchProductData initially to populate the table
// fetchProductData();
