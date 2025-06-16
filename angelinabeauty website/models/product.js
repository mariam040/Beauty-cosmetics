const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
  type: String,
  required: true
}
,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['body', 'face', 'perfume', 'makeup'] 
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true // add createdAt و updatedAt outomatically
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
