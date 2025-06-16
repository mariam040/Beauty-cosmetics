const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartcontroller');
// ✅ Session protection
const isAuthenticated = (req, res, next) => {
  if (req.session.user) return next();
  return res.redirect('/auth');
};
router.post('/add/:id',isAuthenticated, cartController.addToCart); 

router.get('/shoppingCart', cartController.getCart); // ✅ Show session cart
router.post('/remove/:id', cartController.removeFromCart);
router.post('/update/:id', cartController.updateQuantity);
router.post('/place-order', cartController.placeOrder);
router.post('/cart/add/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Make sure the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Add to cart logic here
    // (e.g., req.session.cart or database logic)

    return res.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.error('Cart Add Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


router.post('/add/:id', async (req, res) => {
  // logic to add product to cart
  res.json({ success: true, message: 'Added to cart' });
});

module.exports = router;

