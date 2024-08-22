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
// Serve Static Files
app.use('/css', express.static(path.join(__dirname, '../public/stylesheet')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/videos', express.static(path.join(__dirname, '../public/videos')));
app.use('/views', express.static(path.join(__dirname, '../public/views')));
app.use('/scripts', express.static(path.join(__dirname, '../src')));
app.use('/components', express.static(path.join(__dirname, '../src/components')));
app.use('/service', express.static(path.join(__dirname, '../src/services')));
app.use('/utils', express.static(path.join(__dirname, '../src/utils')));

//Serve Static Pages
app.use('/products', express.static(path.join(__dirname, '../public/web/products.html')));
app.use('/services', express.static(path.join(__dirname, '../public/web/services.html')));


// Use router
app.use('/', router);

// Fallback route (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/index.html'));
});

module.exports = app;
