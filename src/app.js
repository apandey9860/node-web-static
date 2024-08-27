const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const tradeRouter = require('./routes/tradeRouter');
const repairRouter = require('./routes/repairRouter');
const app = express();


// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const pathData = JSON.parse(req.body.pathData);
      const uploadPath = pathData.uploadPath;
      console.log(uploadPath)

      // Ensure the path is under the images directory
      const fullUploadPath = path.join(__dirname, '../public', uploadPath);

      // Create directory if it does not exist
      if (!fs.existsSync(fullUploadPath)) {
          fs.mkdirSync(fullUploadPath, { recursive: true });
      }

      cb(null, fullUploadPath);
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

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
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/register.html'));
});
app.get('/tProducts', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/manageTradeProducts.html'));
});
app.get('/product_repair', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/product_repair.html'));
});
app.get('/trade_procedure', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/trade_procedure.html'));
});

// Handle dynamic product pages
app.get('/products/:productName', (req, res) => {
  const productName = req.params.productName;
  res.params.productName = productName;
  // Load content based on `productName` from a database or file
  res.sendFile(path.join(__dirname, '../public/web/product.html'));
});

// Handle the POST request to /upload
app.post('/upload', upload.single('picture'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

// Use router
app.use('/user', userRouter);
app.use('/trade', tradeRouter);
app.use('/repair', repairRouter);

// Fallback route (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/index.html'));
});

module.exports = app;
