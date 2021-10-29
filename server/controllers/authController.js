const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const User = require("../models/User");
const ObjectId = require('mongoose').Types.ObjectId;

const {
  validateFullName,
  validateEmail,
  validateUsername,
  validatePassword,
  validateCompanyName,
} = require("../utils/validation");

module.exports.login = async (req, res, next) => {
  const { token } = req.headers;
  const { usernameOrEmail, password } = req.body || null;

  try {
    if (token) {
      const decodedId = await jwt.verify(token, process.env.JWT_SECRET).id;
      const decodedUser = await User.findById(decodedId);

      return res.send({
        user: {
          _id: decodedUser._id,
          fullName: decodedUser.fullName,
          email: decodedUser.email,
          admin: decodedUser.admin,
          tenantId: decodedUser.tenantId,
        },
        token
      });
    }

    //if not username or password return error
    if (!usernameOrEmail || !password) {
      return res
        .status(401)
        .send({ error: "Please provide both a username/email and password." });
    }

    //find user
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

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
        },
        token: jwt.sign({ id: user._id, tenantId: user.tenantId }, process.env.JWT_SECRET, {
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
    username,
    password,
    companyName,
    address,
    industry,
  } = req.body;
  const validateFullNameError = validateFullName(fullName);
  const validateEmailError = validateEmail(email);
  const validateUsernameError = validateUsername(username);
  const validatePasswordError = validatePassword(password);
  const validateCompanyNameError = validateCompanyName(companyName);

  if (validateFullNameError) {
    return res.status(401).send({ error: validateFullNameError });
  }
  if (validateEmailError) {
    return res.status(401).send({ error: validateEmailError });
  }
  if (validateUsernameError) {
    return res.status(401).send({ error: validateUsernameError });
  }
  if (validatePasswordError) {
    return res.status(401).send({ error: validatePasswordError });
  }
  if (validateCompanyNameError) {
    return res.status(401).send({ error: validateCompanyNameError });
  }

  try {
    //check if username exist
    const usernameExist = !!(await User.findOne({ username }));
    if (usernameExist)
      return res
        .status(401)
        .send({ error: "There is already an account with this username" });

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
      username,
      password,
      admin: true,
      tenantId: ObjectId(company._id),
    });

    //Save
    company.save();
    user.save();

    //send with jwt token
    res.send({
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        admin: user.admin,
        tenantId: user.tenantId,
      },
      token: jwt.sign({ id: user._id, tenantId: user.tenantId }, process.env.JWT_SECRET, {
        expiresIn: "5h",
      }),
    });
  } catch (err) {
    next(err);
  }
};
