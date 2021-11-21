const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  cart: [
    {
      product: {
        type: Schema.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number },
      price: { type: Number },
    },
  ],
});

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
