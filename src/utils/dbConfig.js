// dbConfig.js
const { Pool } = require('pg');

// Configure the database connection
const pool = new Pool({
    user: 'admin', // Replace with your database user
    host: 'localhost', // Replace with your database host
    database: 'EERO', // Replace with your database name
    password: 'yourpassword', // Replace with your database password
    port: 5432, // Replace with your database port if different
});

module.exports = pool;
