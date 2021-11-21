const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Object,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  status: {
      type: String,
      default: 'pending',
      required: true,
}, 
date: {
  type: Date,
  default: Date.now
}
});



const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;