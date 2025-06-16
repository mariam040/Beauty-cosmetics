// models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number
});

module.exports = mongoose.model('CartItem', cartItemSchema);
