const express = require('express');
const orderRouter = express.Router();

const { placeOrder, getUserOrders } = require('../controllers/orderController');
const { requireAuth } = require('../middleware/auth');


orderRouter.post('/', requireAuth, placeOrder);
orderRouter.get('/user', requireAuth, getUserOrders);


module.exports = orderRouter;