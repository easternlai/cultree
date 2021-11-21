const Product = require('../models/Product');

module.exports.createProduct = async (req, res, next) => {

    const {productName, stock, description, price, image} = req.body;

    console.log(req.file);
    
    
    res.send({productName, stock, description, price});
}