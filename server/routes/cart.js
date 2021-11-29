const express = require('express');
const { getCart, ModifyCart } = require('../controllers/cartController');
const cartRouter = express.Router();

const {requireAuth} = require('../middleware/auth');

cartRouter.put('/:productId', requireAuth, ModifyCart);
cartRouter.get('/', requireAuth, getCart);

module.exports = cartRouter;