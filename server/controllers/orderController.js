const Company = require("../models/Company");
const Order = require("../models/Order");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.placeOrder = async (req, res, next) => {
  const { items } = req.body;
  const user = req.user;
  try {
    const currentOrderNumber = (await Company.findOneAndUpdate(
      { _id: ObjectId(user.tenantId) },
      {$inc: {currentOrderNumber: 1}}
    )).currentOrderNumber;
    
    items.map((item)=>{ 
        const order = new Order({
            user: user.id,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
            orderNumber: currentOrderNumber
        });

        order.save();
    });
    res.send({msg: `Your order #${currentOrderNumber} has been placed.`});
  } catch (err) {
    next(err);
  }
};
