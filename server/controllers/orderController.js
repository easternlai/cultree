const Company = require("../models/Company");
const User = require("../models/User");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.placeOrder = async (req, res, next) => {
  const { items } = req.body;
  const user = req.user;

  try {
    let totalPrice = 0;
    items.map((item) => {
      totalPrice += item.price;
    });

    const userBalance = (await User.findOne({ _id: user.id })).balance;
    if (userBalance < totalPrice) {
      return res.send({
        msg: "You do not have enough points to complete this purchase.",
      });
    } else {
      const currentOrderNumber = (
        await Company.findOneAndUpdate(
          { _id: ObjectId(user.tenantId) },
          { $inc: { currentOrderNumber: 1 } }
        )
      ).currentOrderNumber;

      items.map((item) => {
        const order = new Order({
          user: user.id,
          company: user.tenantId,
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
      await User.findOneAndUpdate({_id: user.id}, {$set: {balance: (userBalance - totalPrice)}});

      res.send({
        currentOrderNumber
      });
    }
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
        _id: { orderNumber: "$orderNumber" },
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
        orderItems: {
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
              date: {
                $arrayElemAt: [
                  "$item.date",
                  { $indexOfArray: ["$item.product", "$$c._id"] },
                ],
              },

              productName: "$$c.productName",
              image: "$$c.image",
            },
          },
        },
      },
    },
    {
      $sort: {orderNumber:-1}
    },
    {
      $project: {
        orderNumber: true,
        date: true,
        orderItems: true,
        _id: false,
      },
    },
  ]);

  res.send({ orders });
};

module.exports.retrievePendingOrders = async (req, res, next) => {
  const user = req.user;

  try {
    const admin = (await User.findOne({ _id: user.id })).admin;
    if (admin < 5) {
      return res.send({
        msg: "You do not have permissions to perform this action.",
      });
    }

    const allOPendingOrders = await Order.aggregate([
      {
        $match: { company: ObjectId(user.tenantId) },
      },
      {
        $match: { status: "pending" },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
    ]);

    res.send(allOPendingOrders);
  } catch (err) {
    next(err);
  }
};
