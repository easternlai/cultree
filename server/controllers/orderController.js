const Company = require("../models/Company");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const ObjectId = require("mongoose").Types.ObjectId;
const { rawListeners } = require("../models/Company");

module.exports.placeOrder = async (req, res, next) => {
  const { items } = req.body;
  const user = req.user;

  try {
    const currentOrderNumber = (
      await Company.findOneAndUpdate(
        { _id: ObjectId(user.tenantId) },
        { $inc: { currentOrderNumber: 1 } }
      )
    ).currentOrderNumber;

    items.map((item) => {
      const order = new Order({
        user: user.id,
        product: item.product,
        quantity: item.quantity,
        price: item.price,
        orderNumber: currentOrderNumber,
      });

      order.save();
    });

    await Cart.findOneAndUpdate(
      { user: ObjectId(user.id) },
      { $set: { cartItems: [] } }
    );

    res.send({
      msg: `Your order #${currentOrderNumber} has been placed. You're cart is now empty.`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserOrders = async (req, res, next) => {
  const user = req.user;

  const orders = await Order.aggregate([
    { $match: { user: ObjectId(user.id) } },
    {
      $group: {
        _id: { orderNumber: "$orderNumber"},
        item: {
          $push: {
            orderId: "$_id",
            quantity: "$quantity",
            price: "$price",
            status: "$status",
            product: "$product",
            date: "$date",
          },
        },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "item.product",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $addFields: {
        orderNumber: "$_id.orderNumber",
        date: "$_id.date",
        orderItem: {
          $map: {
            input: "$product",
            as: "c",
            in: {
              status: {
                $arrayElemAt: [
                  "$item.status",
                  { $indexOfArray: ["$item.product", "$$c._id"] },
                ],
              },
              price: {
                $arrayElemAt: [
                  "$item.price",
                  { $indexOfArray: ["$item.product", "$$c._id"] },
                ],
              },
              quantity: {
                $arrayElemAt: [
                  "$item.quantity",
                  { $indexOfArray: ["$item.product", "$$c._id"] },
                ],
              },
              orderId: {
                $arrayElemAt: [
                  "$item.orderId",
                  { $indexOfArray: ["$item.product", "$$c._id"] },
                ],
              },
              date:{
                $arrayElemAt:[
                  '$item.date',
                  { $indexOfArray: [ "$item.product", "$$c._id"]}
                ]
              },

              productName: "$$c.productName",
              image: "$$c.image",
            },
          },
        },
      },
    },
    {
      $project: {
        orderNumber: true,
        date: true,
        orderItem: true,
        _id: false,
      },
    },
  ]);

  res.send({ orders });
};
