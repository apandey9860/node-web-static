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
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/admin.html'));
});
app.get('/product_repair', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/product_repair.html'));
});
app.get('/trade_procedure', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/trade_procedure.html'));
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/header2.html'));
});
// admin page/dashboard
app.get('/adminpage', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/admin-page.html'));
});
//product  list
app.get('/adminproductlist', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/admin-productlist.html'));
});
//product  details
app.get('/productdetails', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/product-details.html'));
});
//product  create (create a product)
app.get('/createproduct', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/admin-create.html'));
});
//product  edit , edit a product
app.get('/adminedit', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/admin-edit.html'));
});
// category list
app.get('/pcategorylist', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/category-list.html'));
});
// category edit
app.get('/pcategoryedit', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/category-edit.html'));
});
//category create
app.get('/pcategorycreate', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/category-create.html'));
});
// orders list
app.get('/porderlist', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/porderlist.html'));
});
//inventory of all products
app.get('/inventory', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/inventory.html'));
});
//all the recieved orders (inventory)
app.get('/recievedorders', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/inventory-recieved.html'));
});
// order cartpage
app.get('/ordercart', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/order-cart.html'));
});
//checkout
app.get('/ordercheckout', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/order-checkout.html'));
});
//  Order Details
app.get('/orderdetail', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/order-detail.html'));
});
//repair section
//repair product-list
app.get('/rproductlist', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rproduct-list.html'));
});
app.get('/rproductdetails', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rproduct-details.html'));
});
//repair product=create
app.get('/rproductcreate', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rproduct-create.html'));
});
//repair product-edit
app.get('/rproductedit', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rproduct-edit.html'));
});
//repair category section
//rcategory-list
app.get('/rcategorylist', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rcategory-list.html'));
});
//rcategory-create
app.get('/rcategorycreate', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rcategory-create.html'));
});
//rcategory-edit
app.get('/rcategoryedit', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rcategory-edit.html'));
});
//orders section
//order list
app.get('/rorderlist', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rorder-list.html'));
});
//order details
app.get('/rorderdetails', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rorder-details.html'));
});
//order cart
app.get('/rordercart', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rorder-cart.html'));
});
//order checkout
app.get('/rordercheckout', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/rorder-checkout.html'));
});
app.get('/services-alt', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/web/services-alt.html'));
});
// Handle dynamic product pages
app.get('/product/*', (req, res) => {
  // const productID = req.params.productID;
  // res.params.productID = productID;
  // Load content based on `productID` from a database or file
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
