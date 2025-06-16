const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fullname: String,
  phone: String,
  city: String,
  area: String,
  address: String,
  floor: String,
  apartment: String,
  addressName: String,
  paymentMethod: String,
  cart: Array,
  total: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // must match your User model name
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
