const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

const {
    validateFullName,
    validateEmail,
    validateUsername,
    validatePassword,
    validateCompanyName,
} = require("../utils/validation");

module.exports.createUser = async (req, res, next) => {
    const {
        fullName,
        email,
        username,
        password,
        department,
        startDate,
        admin,
    } = req.body;

    const validateFullNameError = validateFullName(fullName);
    const validateEmailError = validateEmail(email);
    const validateUsernameError = validateUsername(username);
    const validatePasswordError = validatePassword(password);

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

    try {

        const tenantId = (await User.findOne({ _id: req.user.id })).tenantId;

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

        const user = new User({
            fullName,
            email,
            username,
            password,
            startDate,
            department,
            admin,
            tenantId: ObjectId(tenantId),
          });

        user.save();

        res.send({ message: `A user account has been created for ${fullName}.`});

    } catch (err) {
        next(err);
    }

}