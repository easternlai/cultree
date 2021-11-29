const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports.ModifyCart = async (req, res, next) => {
  const { productId } = req.params;
  const { quantity, orderPrice } = req.body;
  const userId = req.user.id;

  if (quantity == 0) {
    return res.send({ msg: "Please enter a quantity greater than 0." });
  }

  try {
    const product = await Product.findById(productId);
    const user = await User.findById(userId);
    const cart = await Cart.findOne({
      user: userId
    });

    let deleteItem = false;
    cart.cartItems.map((item) => {
      if(parseInt(item.quantity) + parseInt(quantity) == 0 && item.productId == productId ){
        deleteItem = true;
      }
    });

    if (deleteItem) {
       const response = await Cart.updateOne({
        user: userId, "cartItems.productId": productId
       }, 
        { $pull: {cartItems: {productId: productId}}}
       );
       return res.send({productId, quantity});
    }


    const alreadyInCart = !!(await Cart.countDocuments({
      user: userId,
      "cartItems.productId": productId,
    }));

    if (alreadyInCart) {
      await Cart.updateOne(
        { user: userId, "cartItems.productId": productId },
        { $inc: { "cartItems.$.quantity": quantity } }
      );
    } else {
      if (quantity > 0) {
        await Cart.updateOne(
          { user: userId },
          { $push: { cartItems: { productId, quantity, orderPrice } } }
        );
      } else {
        throw new Exception("Please enter a quantity greater than 0.");
      }
    }

    return res.send({ productId, quantity});
  } catch (err) {
    next(err);
  }
};

module.exports.getCart = async (req, res, next) => {
  const user = req.user;
  try {
    const cart = await Cart.aggregate([
      {
        $match: {
          user: ObjectId(user.id),
        },
      },
      {
        $unwind: "$cartItems",
      },
      {
        $lookup: {
          from: "products",
          localField: "cartItems.productId",
          foreignField: "_id",
          as: "cartItems.cartItem",
        },
      },
      {
        $group: {
          _id: "$_id",
          cartItems: { $push: "$cartItems" },
        },
      },
      {
        $unwind: "$cartItems",
      },
      {
        $unwind: "$cartItems.cartItem",
      },
      {
        $addFields: {
          "cartItems.productName": "$cartItems.cartItem.productName",
          "cartItems.image": "$cartItems.cartItem.image",
          "cartItems.description": "$cartItems.cartItem.description",
        },
      },
      {
        $unset: "cartItems.cartItem",
      },

      {
        $group: {
          _id: "$_id",
          cartItems: { $push: "$cartItems" },
        },
      },
    ]);

    return res.send(cart[0]);
  } catch (err) {
    next(err);
  }
};
