const express = require('express');
const orderRouter = express.Router();

const { placeOrder } = require('../controllers/orderController');
const { requireAuth } = require('../middleware/auth');


orderRouter.post('/', requireAuth, placeOrder);

module.exports = orderRouter;