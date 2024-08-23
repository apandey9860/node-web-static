const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./routes/router');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve additional static directories
app.use('/fonts', express.static(path.join(__dirname, '../public/fonts')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/videos', express.static(path.join(__dirname, '../public/videos')));
app.use('/videos', express.static(path.join(__dirname, '../public/viwes')));

// Serve static JS files from a specific directory
app.use('/scripts', express.static(path.join(__dirname, '../src')));
app.use('/components', express.static(path.join(__dirname, '../src/components')));
app.use('/service', express.static(path.join(__dirname, '../src/services')));
app.use('/utils', express.static(path.join(__dirname, '../src/utils')));

// Serve static HTML pages
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/products.html'));
});
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/services.html'));
});

// Handle dynamic product pages
app.get('/products/:productName', (req, res) => {
  const productName = req.params.productName;
  res.params.productName = productName;
  // Load content based on `productName` from a database or file
  res.sendFile(path.join(__dirname, '../public/web/product.html'));
});

// Use router
app.use('/', router);

// Fallback route (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/index.html'));
});

module.exports = app;
