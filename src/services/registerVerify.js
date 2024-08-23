// registerVerify.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form values
        const username = document.getElementById('username').value;
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const userAccessId = document.getElementById('user_access_id').value;

        // Validate that passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Prepare data to send to the server
        const userData = {
            user_name: username,
            user_fullname: fullname,
            user_password: password,
            user_phone: phone,
            user_email: email,
            user_address: address,
            user_access_id: userAccessId
        };

        try {
            // Send data to the server using Fetch API
            const response = await fetch('/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            // Handle response from the server
            if (response.ok) {
                alert('Registration successful!');
                // Redirect to the login page or another page
                window.location.href = '/login';
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message || 'Unknown error occurred'}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed: Network or server error');
        }
    });
});
