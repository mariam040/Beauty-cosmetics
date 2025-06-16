const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /checkout — render form with summary
router.get('/checkout', (req, res) => {
  // Use session cart (from cartController), not localStorage
  const cart = req.session.cart || [];
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50;
  const total = subtotal + shipping;

  res.render('checkout', { subtotal, shipping, total });
});

// POST /checkout — receive form and save order
router.post('/checkout', async (req, res) => {
  try {
    const {
      fullname, phone, city, area, address,
      floor, apartment, addressName, paymentMethod
    } = req.body;

    const cart = req.session.cart || [];
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 50;
    const total = subtotal + shipping;

    if (!fullname || !phone || cart.length === 0) {
      return res.status(400).send('❌ Missing required fields or cart empty.');
    }

    const newOrder = new Order({
      fullname, phone, city, area, address,
      floor, apartment, addressName, paymentMethod,
      cart, total
    });

    await newOrder.save();
    req.session.cart = []; // clear cart

    res.redirect('/checkout-success');
  } catch {
    res.status(500).send('❌ Error placing order.');
  }
});

// GET success page
router.get('/checkout-success', (req, res) => {
  res.render('checkout-success');
});

module.exports = router;
