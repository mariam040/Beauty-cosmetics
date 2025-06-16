// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

// Load environment variables
dotenv.config();

// Models
const Order = require('./models/Order');
const Product = require('./models/product');

// Controllers
const { renderShopPage, renderProductDetails } = require('./controllers/productController');
const { renderHomepage } = require('./controllers/homeController');
const { getCart } = require('./controllers/cartcontroller');

// Route Modules
const staticRoutes = require('./routes/staticRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartroutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const productApiRoutes = require('./routes/productApiRoutes');


const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));

// Static files
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Authentication middleware
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/auth');
}

// Routes
app.use('/', staticRoutes);
app.use('/', authRoutes);
app.use('/cart', isAuthenticated, cartRoutes); // ✅ كده السلة محمية

app.use('/', checkoutRoutes);
app.use('/api/products', productApiRoutes);
const userRoutes = require('./routes/userdetailsroute');
app.get('/findus', (req, res) => {
  res.render('findus');
});

app.use(userRoutes);

// Page Routes
app.get('/auth', (req, res) => res.render('auth'));
app.get('/homepage', renderHomepage);
app.get('/shop', renderShopPage);
app.get('/product/:id', renderProductDetails);
app.get('/shoppingCart', getCart);
app.get('/aboutus', (req, res) => res.render('aboutus'));
// Checkout and Admin Pages (protected)
app.get('/checkout', isAuthenticated, (req, res) => {
  const cartItems = req.session.cart || [];
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50;
  const total = subtotal + shipping;
  res.render('checkout', { cartItems, subtotal, shipping, total });
});

app.get('/checkout-success', isAuthenticated, (req, res) => {
  res.render('checkout-success');
});

app.get('/admin',  (req, res) => res.render('admin'));

app.get('/userdetails',  async (req, res) => {
  try {
    const orders = await Order.find();
    res.render('userdetails', { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching user details');
  }
});

// Category Pages
app.get('/perfume', async (req, res) => {
  try {
    const products = await Product.find({ category: 'perfume' });
    res.render('perfume', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading perfume products');
  }
});

app.get('/makeup', async (req, res) => {
  const products = await Product.find({ category: { $regex: /^makeup$/i } });
  res.render('makeup', { products });
});

app.get('/bodycare', async (req, res) => {
  const products = await Product.find({ category: { $regex: /^body$/i } });
  res.render('bodycare', { products });
});

app.get('/facecare', async (req, res) => {
  const products = await Product.find({ category: { $regex: /^face$/i } });
  res.render('facecare', { products });
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).render('404');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

