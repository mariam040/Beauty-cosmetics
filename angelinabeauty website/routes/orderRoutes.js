const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/checkout
router.post('/checkout', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!', orderId: savedOrder._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to place order.' });
  }
});

module.exports = router;
const cartController = require('./controllers/cartcontroller');
app.post('/place-order', cartController.placeOrder);

