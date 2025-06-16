const Product = require('../models/product');

// ✅ GET: Show Cart Page
exports.getCart = (req, res) => {
  const cartItems = req.session.cart || [];

  const shipping = 50; // constant value
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const total = subtotal + shipping - discount;

  res.render('shoppingCart', {
    cartItems,
    subtotal,
    discount,
    shipping,  // ✅ make sure this is included
    total
  });
};

const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const cartItems = req.session.cart || [];
    if (cartItems.length === 0) return res.redirect('/cart');

    const { fullname, phone, city, area, address, floor, apartment, addressName, paymentMethod } = req.body;

    // 💡 Calculate total from the session cart
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 50;
    const total = subtotal + shipping;

    const newOrder = new Order({
      user: req.user._id,
      fullname,
      phone,
      city,
      area,
      address,
      floor,
      apartment,
      addressName,
      paymentMethod,
      cart: cartItems,
      total
    });

    await newOrder.save();

    // Clear cart from session
    req.session.cart = [];

    res.redirect('/thankyou'); // or any page you prefer
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to place order');
  }
};

// ✅ ADD to Cart (session-based)
exports.addToCart = async (req, res) => {
  if (!req.session.user) {
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
    return res.status(401).json({ success: false, message: 'You must log in first' });
  } else {
    return res.redirect('/auth');
  }
}

  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) return res.status(404).send('Product not found');

  if (!req.session.cart) req.session.cart = [];

  const existing = req.session.cart.find(item => item._id == product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    req.session.cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image, // only if you use it
      quantity: 1
    });
  }

  res.redirect('/shoppingCart');
};

// ✅ REMOVE from Cart
exports.removeFromCart = (req, res) => {
  const id = req.params.id;
  if (!req.session.cart) return res.redirect('/shoppingCart');

  req.session.cart = req.session.cart.filter(item => item._id !== id);
  res.redirect('/shoppingCart');
};

// ✅ UPDATE Quantity
exports.updateQuantity = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const cart = req.session.cart || [];

  const item = cart.find(item => item._id === id);
  if (item) {
    const newQty = parseInt(quantity);
    if (!Number.isInteger(newQty) || newQty < 1) {
      return res.status(400).send('Invalid quantity');
    }
    item.quantity = newQty;
  }

  res.redirect('/shoppingCart');
};
exports.placeOrder = async (req, res) => {
  try {
    const cartItems = req.session.cart || [];
    if (cartItems.length === 0) return res.redirect('/cart');

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 50;
    const total = subtotal + shipping;

    console.log('📦 CART:', cartItems);
    console.log('💰 TOTAL:', total);

    const newOrder = new Order({
      // ...
      cart: cartItems,
      total
    });

    await newOrder.save();
    req.session.cart = [];
    res.redirect('/thankyou');
  } catch (err) {
    console.error('🛑 Order Error:', err);
    res.status(500).send('Failed to place order');
  }
};