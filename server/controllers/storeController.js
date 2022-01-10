const fs = require("fs");
const S3 = require("aws-sdk");

const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");


module.exports.createProduct = async (req, res, next) => {
  const { productName, stock, category, description, price } = req.body;

  const userId = req.user.id;
  let image = undefined;
  console.log(productName)

  try {
    const user = await User.findOne({ _id: userId });

    if (user.admin < 5) {
      return res.status(401).send({
        error: "You do not have permissions to perform this action.",
      });
    }

    //if image exist
    if (req.file) {
      const fileStream = fs.createReadStream(req.file.path);
      s3 = new AWS.S3({
        region: process.env.S3_REGION,
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      });
      const s3Response = await s3
        .upload({
          Bucket: process.env.S3_BUCKET,
          Body: fileStream,
          Key: req.file.filename,
        })
        .promise();
      image = s3Response.Location;
    }

    const product = new Product({
      productName,
      stock,
      price,
      category,
      description,
      image,
      company: user.tenantId,
    });

    //save product
    product.save();

    //res.send product
    res.send(product);
  } catch (err) {
    console.log("test");
    next(err);
  }
};

module.exports.getProducts = async (req, res, next) => {
  const user = req.user;

  try {
    const products = await Product.find({ company: user.tenantId });
    res.send(products);
  } catch (err) {
    next(err);
  }
};
