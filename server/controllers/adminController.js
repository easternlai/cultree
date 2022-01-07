const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const {
  validateFullName,
  validateEmail,
  validatePassword,
} = require("../utils/validation");

module.exports.createUser = async (req, res, next) => {
  const { fullName, email, password, startDate, admin } = req.body;

  const validateFullNameError = validateFullName(fullName);
  const validateEmailError = validateEmail(email);
  const validatePasswordError = validatePassword(password);

  if (validateFullNameError) {
    return res.status(401).send({ error: validateFullNameError });
  }
  if (validateEmailError) {
    return res.status(401).send({ error: validateEmailError });
  }
  if (validatePasswordError) {
    return res.status(401).send({ error: validatePasswordError });
  }

  try {
    const creator = (await User.findOne({ _id: req.user.id }));

    const tenantId = creator.tenantId;


    //check if creator is admin
    if(creator.admin < 5){
        return res.status(401).send({
            error: "You do not have permissions to perform this action."
        });
    }

    //check if email exist
    const emailExist = !!(await User.findOne({ email }));
    if (emailExist)
      return res.status(401).send({
        error:
          "There is already an account associated with this email address.",
      });
      console.log('test');

    const user = new User({
      fullName,
      email,
      password,
      startDate,
      admin,
      tenantId: ObjectId(tenantId),
    });

    const cart = new Cart({
      user: ObjectId(user._id)
    });

    user.save();
    cart.save();

    res.send({ message: `A user account has been created for ${fullName}.`});
  } catch (err) {
    return err;
  }
};

module.exports.retrieveUsers = async (req, res, next) => {

  try {

    const requester = await User.find({_id: req.user.id});
    if(!requester || requester.admin < 5){
      return res.status(404).send({err: "You do not have permissions to perform this action."});
    }

    const users = await User.aggregate([
      {
        $match: {tenantId: ObjectId(req.user.tenantId)},
      },
      {
        $project: {
          _id: true,
          fullName: true,
          email: true,
          password: true,
          admin: true,
          balance: true,
        }
      }
    ])

    res.send(users);
    
  } catch (err) {
    next(err);
  }
}

module.exports.editUser = async (req, res, next) => {
  const { userId, points, privileges} = req.body;
  console.log(privileges);

  try {
    const requester = await User.findOne({_id: req.user.id});
    if(requester.admin !== 5) {
      return res.status(404).send({msg: 'You do not have permissions to perform this action. '});
    }

    const updatedUser = await User.updateOne({_id: ObjectId(userId)}, [{$set: {balance: points, admin:privileges }}], {$upsert: false} );

    res.send({updatedUser});
  } catch (err) {
    next(err);
  }
}

module.exports.getOrders = async (req, res, next) => {

  const {orderStatus} = req.params;
  console.log(orderStatus);

  try {
    const requester = await User.findOne({_id: req.user.id});
    if(requester.admin !== 5) {
      return res.status(404).send({msg: 'You do not have permissions to perform this action. '});
    }

    const openOrders = await Order.aggregate([
      {$match: {company: ObjectId(req.user.tenantId)}},
      {$match: {status: orderStatus}},
      {$lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }},
      {$unwind: '$user'},
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product',
        }
      },
      {
        $unwind: '$product'
      },
      {$project: {
        date: true,
        orderNumber: true,
        price: true,
        quantity: true,
        status: orderStatus,
        user: {
          fullName: true,
        },
        product: {
          productName: true,
          stock: true,
        },
      }}
    ]);

    res.send(openOrders);
  } catch (err) {
    next(err);
  }
}

module.exports.changeOrderStatus = async (req, res, next) =>{
  const {orderId, newStatus } = req.body;

  console.log(newStatus);

  try {
    const requester = await User.findOne({_id: req.user.id});

    if(requester.admin !== 5) {
      return res.status(404).send({msg: 'You do not have permissions to perform this action. '});
    }

    const order = await Order.findOne({_id: orderId, company: req.user.tenantId});
    
    if(!order){
      res.status(401).send({msg: "This order number does not exist."});
    }

    await Order.updateOne({_id: orderId, company: req.user.tenantId}, {status: newStatus}, {$upsert: false})

    res.send(order);
  } catch (err) {
    next(err); 
  }

}