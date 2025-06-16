const express = require('express');
const router = express.Router();
const userDetailsController = require('../controllers/userdetailscontroller');

// ✅ Admin: View all orders
router.get('/userdetails', userDetailsController.getAllOrders);

// ✅ User: View only their orders (by ID)
router.get('/userdetails/:id', userDetailsController.getUserDetails);

module.exports = router;
