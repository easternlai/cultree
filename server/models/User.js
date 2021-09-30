const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  tenantId: {
      type: Schema.ObjectId,
      ref: 'Company',
      required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
  },
  department: {
    type: String,
  },
  startDate: {
    type: String,
  },
  admin: {
      type: Boolean,
  }
});

//encrypt token

userSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
