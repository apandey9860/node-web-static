const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Example route
router.get('/test', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Add more routes as needed
router.post('/submit', (req, res) => {
  // Handle form submission or any other POST request
  res.json({ status: 'success', data: req.body });
});


module.exports = router;
