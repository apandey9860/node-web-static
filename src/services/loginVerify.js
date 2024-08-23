document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const container = document.getElementById('login-box');
    if (container) {
        const form = container.querySelector("#loginForm");
        form.addEventListener('submit', async function(event) {
            // Prevent the default form submission
            event.preventDefault();

            // Get the username and password values
            const username = form.elements['username'].value;
            const password = form.elements['password'].value;
            try {
                await handleLogin(username, password);
            } catch (error) {
                console.error('Login error:', error);
                // Optionally, display an error message to the user
            }
        });
    }
});

async function fetchToken() {
    try {
        const response = await fetch('/token-val');
        if (response.ok) {
            return await response.text();
        } else {
            throw new Error('Failed to fetch token');
        }
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
}

async function handleLogin(username, password) {
    try {
        const token = await fetchToken();
        const hashedPassword = await hashPassword(password);
        const user = await verifyLogin('users', username, hashedPassword, token);

        if (user) {
            await storeSessionData(username, user.user_access_id, token);
            await redirectToCRUD();
        } else {
            throw new Error('Invalid login credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Optionally, display an error message to the user
    }
}

async function hashPassword(password) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function verifyLogin(table, username, password, token) {
    try {
        const response = await fetch(`/api/${table}/login/${username}/${password}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in headers
            }
        });

        if (!response.ok) {
            throw new Error('Failed to verify login');
        }

        const data = await response.json();
        return data; // Return user data if verification is successful
    } catch (error) {
        console.error('Error verifying login:', error);
        throw error;
    }
}

async function redirectToCRUD() {
    try {
        // Construct the redirect URL
        const redirectURL = '/admin';
        window.location.href = redirectURL;
    } catch (error) {
        console.error('Error redirecting:', error);
        // Optionally, handle redirection error
    }
}

async function storeSessionData(username, accessLevel, token) {
    try {
        const response = await fetch(`/store-value/${username}/${accessLevel}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in headers
            }
        });

        if (!response.ok) {
            throw new Error('Failed to store session data');
        }
    } catch (error) {
        console.error('Error storing session data:', error);
        throw error;
    }
}
