const express = require('express');
const { addToCart } = require('../controllers/cartController');
const cartRouter = express.Router();

const {requireAuth} = require('../middleware/auth');

cartRouter.put('/', requireAuth, addToCart);

module.exports = cartRouter;