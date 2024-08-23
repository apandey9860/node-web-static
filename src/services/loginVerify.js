// loginVerify.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form values
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;
        console.log(password);

        // Prepare data to send to the server
        const loginData = {
            user_name: username,
            user_password: password
        };
        console.log(loginData);
        try {
            // Send data to the server using Fetch API
            const response = await fetch('/user/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            console.log(response.status);

            // Handle response from the server
            if (response.ok) {
                if (response.status === 200) {
                    // alert('Login successful!');
                    // Redirect to the dashboard or another page
                    window.location.href = '/';
                } else {
                    alert('Invalid username or password. Please try again.');
                }
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Unknown error occurred'}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed: Network or server error');
        }
    });
});
