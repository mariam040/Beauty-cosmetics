// controllers/userDetailsController.js
const User = require('../models/User');
const Order = require('../models/Order');

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id; // أو req.user._id لو المستخدم الحالي
    const user = await User.findById(userId);
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.render('userdetails', { user, orders }); // ← لازم تكون الكلمة "user"
  } catch (error) {
    console.error('Error loading user details:', error);
    res.status(500).send('Something went wrong.');
  }
};
