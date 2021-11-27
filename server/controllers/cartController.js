const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");

module.exports.addToCart = async (req, res, next) => {
    const { productId } = req.params;
    const { quantity, price } = req.body;
    const userId = req.user.id;
    
   if(quantity == 0) {
       return res.send({msg: 'Please enter a quantity greater than 0.'});
   }
  
    try {
      const product = await Product.findById(productId);
      const user = await User.findById(userId);
      const AlreadyInCart = !!(await Cart.countDocuments({
        user: userId,
        "cartItems.productId": productId,
      }));
  
      if (AlreadyInCart) {
        await Cart.updateOne(
          { user: userId, "cartItems.productId": productId },
          { $inc: { "cartItems.$.quantity": quantity } }
        );
      }else {
          await Cart.updateOne(
              {user: userId},
              {$push: {cartItems:{productId, quantity, price}}}
          )
      }
  
      res.send({msg: "Cart Updated"});
    } catch (err) {
      next(err);
    }
  };