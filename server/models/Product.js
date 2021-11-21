const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  stock: { 
      type: Number
  },
  price: {
      type: Number,
      default: 0,
  },
  category: {
      type: String,
  },
  description: {
      type: String,
  },
  image: {
      type: String,
  },
  company: {
    type: Schema.ObjectId,
    ref: "Company",
    required: true,
  },
});

const ProductModel = mongoose.model('Item', ProductSchema);

module.exports = ProductModel;