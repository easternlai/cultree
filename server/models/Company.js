const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  industry: {
    type: String,
  },
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
