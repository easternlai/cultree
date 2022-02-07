const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const User = require("../models/User");
const Cart = require('../models/Cart');
const ObjectId = require('mongoose').Types.ObjectId;
const secrets = require('../secrets');

const {
  validateFullName,
  validateEmail,
  validatePassword,
  validateCompanyName,
} = require("../utils/validation");

module.exports.login = async (req, res, next) => {
  const { token } = req.headers;
  const { email, password } = req.body || null;

  try {
    if (token) {
      const decodedId = await jwt.verify(token, secrets.JWT_SECRET).id;
      const decodedUser = await User.findById(decodedId);

      return res.send({
        user: {
          _id: decodedUser._id,
          fullName: decodedUser.fullName,
          email: decodedUser.email,
          admin: decodedUser.admin,
          tenantId: decodedUser.tenantId,
          balance: decodedUser.balance,
        },
        token
      });
    }

    //if not password return error
    if (!email || !password) {
      return res
        .status(401)
        .send({ error: "Please provide both a email and password." });
    }

    //find user
    const user = await User.findOne({ email: email },
    );
    //if no user return error
    if (!user) {
      res
        .status(401)
        .send({ error: "The credentials you entered are incorrect." });
    }

    //find out if passwords match through bcrypt
    //res send user
    bcrypt.compare(password, user.password, function (err, val) {
      if (err) return next(err);
      if (!val)
        return res
          .status(401)
          .send({ error: "The credentials you entered are incorrect." });
      res.send({
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          admin: user.admin,
          tenantId: user.tenantId,
          balance: user.balance
        },
        token: jwt.sign({ id: user._id, tenantId: user.tenantId }, secrets.JWT_SECRET, {
          expiresIn: "5h",
        }),
      });
    });
  } catch (err) {
    next(err);
  }
};

module.exports.registerTenant = async (req, res, next) => {
  const {
    fullName,
    email,
    password,
    companyName,
    address,
    industry,
  } = req.body;
  const validateFullNameError = validateFullName(fullName);
  const validateEmailError = validateEmail(email);
  const validatePasswordError = validatePassword(password);
  const validateCompanyNameError = validateCompanyName(companyName);

  if (validateFullNameError) {
    return res.status(401).send({ error: validateFullNameError });
  }
  if (validateEmailError) {
    return res.status(401).send({ error: validateEmailError });
  }
  if (validatePasswordError) {
    return res.status(401).send({ error: validatePasswordError });
  }
  if (validateCompanyNameError) {
    return res.status(401).send({ error: validateCompanyNameError });
  }

  try {
 
    //check if email exist
    const emailExist = !!(await User.findOne({ email }));
    if (emailExist)
      return res.status(401).send({
        error:
          "There is already an account associated with this email address.",
      });

    const companyExist = !!(await Company.findOne({ companyName }));
    if (companyExist)
      return res.status(401).send({
        error:
          "This company already has a tenant with Bezoo, please contact support if this is an error.",
      });

    const company = new Company({ companyName, address, industry });

    const user = new User({
      fullName,
      email,
      password,
      admin: 5,
      tenantId: ObjectId(company._id),
    });

    const cart = new Cart({
      user: ObjectId(user._id)
    });

    //Save
    company.save();
    user.save();
    cart.save();
  

    //send with jwt token
    res.send({
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        admin: user.admin,
        tenantId: user.tenantId,
      },
      token: jwt.sign({ id: user._id, tenantId: user.tenantId }, secrets.JWT_SECRET, {
        expiresIn: "5h",
      }),
    });
  } catch (err) {
    next(err);
  }
};
