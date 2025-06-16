const User = require('../models/User');
const Order = require('../models/Order');

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id; 
    const user = await User.findById(userId);
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.render('userdetails', { user, orders });
  } catch (error) {
    console.error('Error loading user details:', error);
    res.status(500).send('Something went wrong.');
  }
};
// ✅ Show all orders (Admin view)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.render('userdetails', { orders });
  } catch (error) {
    console.error('Error loading orders:', error);
    res.status(500).send('Something went wrong.');
  }
};