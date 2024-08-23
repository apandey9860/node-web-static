document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    var container = document.getElementById('register-box');
    let formData;
    // Add submit event listener to the form
    if(container){
        var form = container.querySelector("#registerForm");
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            formData = serializeForm(container); 
            onDocLoad(formData);
        });
    }
    
});
async function setToken() {
    try {
        const response = await fetch('/token-val');
        if (response.ok) {
            return await response.text();
        } else {
            throw new Error('Failed to fetch token');
        }
    } catch (error) {
        console.error('Error fetching token:', error);
    }
}
async function onDocLoad(formData){
    const token = await setToken();
    console.log(token);
    var tName = 'users';
    console.log(formData);
    const jsonData = await registerDataJSON(formData)
    console.log(jsonData);
    sendDataToServer(tName, jsonData, token);
}

function serializeForm(container) {
    const formData = {};
    const fields = container.querySelectorAll('input');
    console.log(fields);
    fields.forEach(input => {
        console.log(input);
        const id = input.id;
        const value = input.value;
        if (id){
            formData[id] = value;
        }
    });
    return formData;
}

async function registerDataJSON(formData) {
    const data = {
        USER_NAME: formData.username,
        USER_PASSWORD: await hashPassword(formData.password),
        USER_EMAIL: formData.email,
        USER_ACCESS_ID: 1 // Assuming access level is provided as an integer
        // You can add other fields as needed
    };
    return data;
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function sendDataToServer(userSelectedTable, data, token) {
    var table = userSelectedTable;
    return fetch(`/${table}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add data');
        }
        return response.json();
    })
    .then(result => {
        console.log('Data added successfully:', result);
        // Handle successful response here (if needed)
        // displayAllData();
        redirectToMain();
        // return result; // Optional: Return the result if needed in the chaining
    })
    .catch(error => {
        console.error('Error adding data:', error);
        // Handle error case here (e.g., display error message to user)
        throw error; // Optional: Re-throw the error to propagate it further
    });
}

function redirectToMain() {
    window.location.href = "/main"; // Redirect to login page
}