const Product = require('../models/product');
const multer = require("multer");
const path = require("path");

exports.renderHomepage = async (req, res) => {
  try {
    // Get 7 random products from the database
    const products = await Product.aggregate([{ $sample: { size: 7 } }]);

    res.render('homepage', { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server Error');
  }
};


