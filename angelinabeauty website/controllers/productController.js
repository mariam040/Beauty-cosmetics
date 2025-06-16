const Product = require('../models/product');
const multer = require("multer");
const path = require("path");

// setting to store in multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // images stored here
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});
const upload = multer({ storage: storage });

// API for Bring all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the products.', error });
  }
};

// Add new product
const addProduct = async (req, res) => {
  try {
    console.log("🧾 Body:", req.body);
    console.log("🖼️ File:", req.file);

    const { name, category, quantity, price, description } = req.body;
    const image = req.file ? req.file.filename : null;


    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = new Product({
      name,
      category,
      quantity,
      price,
      description,
      image,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("❌ Failed to add product:", error);
    res.status(400).json({ message: 'Failed to add product', error });
  }
};


// Show the shop page
const renderShopPage = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('shop', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while loading the page.');
  }
};

exports.renderHomepage = async (req, res) => {
  try {
    const products = await Product.find().limit(7);
    res.render('homepage', { products }); // ✅ sends products to EJS
  } catch (err) {
    console.error('❌ Error loading homepage:', err);
    res.status(500).send('Server Error');
  }
};

// Show product details page
const renderProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');

   res.render('product-details', {
  product,
  session: req.session // 👈 this makes session available in EJS
});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Search products using AJAX
const searchProductsAjax = async (req, res) => {
  try {
    const query = req.query.q;
    console.log('🔍 Search Query:', query); // أهو اللوج هنا
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// ✅ دالة تعديل المنتج
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = {
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description
    };

    if (req.file) {
      updatedData.image = req.file.filename; 
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};




// Export all functions and upload
module.exports = {
  upload,
  getAllProducts,
  addProduct,
  updateProduct,         
  deleteProduct,          
  renderShopPage,
  renderProductDetails,
  searchProductsAjax
};

