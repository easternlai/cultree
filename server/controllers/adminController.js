const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

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

    const user = new User({
      fullName,
      email,
      password,
      startDate,
      admin,
      tenantId: ObjectId(tenantId),
    });

    user.save();

    res.send({ message: `A user account has been created for ${fullName}.` });
  } catch (err) {
    next(err);
  }
};
