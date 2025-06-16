const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 

const {
  getAllProducts,
  addProduct,
  upload,
  updateProduct,
  deleteProduct,
  searchProductsAjax
} = require('../controllers/productController');

// API: Get all products
router.get('/', getAllProducts);

// API: Add product
router.post('/', upload.single('image'), addProduct);

// API: Update product
router.put('/:id', upload.single('image'), updateProduct);

// API: Delete product
router.delete('/:id', deleteProduct);

// API: Search
router.get('/search', searchProductsAjax);

// View: Perfume shop
router.get('/shop/perfume', async (req, res) => {
  try {
    const perfumeProducts = await Product.find({ category: 'perfume' });
    res.render('perfumeShop', { products: perfumeProducts });
  } catch (error) {
    console.error('Error fetching perfume products:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router; // ✅ تصدير واحد فقط
