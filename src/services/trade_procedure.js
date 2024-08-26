document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        
        // Get form values
        const productname = document.getElementById('productname').value;
        const productprice = document.getElementById('productprice').value;
        const productshortdesc = document.getElementById('productshortdesc').value;
        const productdesc = document.getElementById('productdesc').value;
        const categoryid = document.getElementById('categoryid').value;
        const productpicname = document.getElementById('productpicname').value;
        const productpicdata = document.getElementById('productpicdata').value;
       

        

        // Prepare data to send to the server
        const tradeData = {
            p_product_name: productname,
            p_product_price: productprice,
            p_product_short_desc: productshortdesc,
            p_product_desc: productdesc,
            p_category_id: categoryid,
            p_prod_pic_name: productpicname,
            p_prod_pic_data: productpicdata,
            
        };
console.log(tradeData)
        try {
            // Send data to the server using Fetch API
            const response = await fetch('/trade/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tradeData),
            });

            // Handle response from the server
            if (response.ok) {
                alert('product added successful!');
                // Redirect to the login page or another page
                // window.location.href = '/login';
            } else {
                const errorData = await response.json();
                alert(`product addition failed: ${errorData.message || 'Unknown error occurred'}`);
            }
        } catch (error) {
            console.error('Error during product entry:', error);
            alert('product entry failed: Network or server error');
        }
    });
});
