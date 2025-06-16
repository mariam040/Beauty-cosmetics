const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  addProduct,   
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');


const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
  .get(protect, admin, getProducts)
  .post(protect, admin, upload.single('image'), addProduct);  

router.route('/:id')
  .put(protect, admin, upload.single('image'), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;