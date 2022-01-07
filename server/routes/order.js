const express = require('express');
const orderRouter = express.Router();

const { placeOrder, getUserOrders, retrievePendingOrders } = require('../controllers/orderController');
const { requireAuth } = require('../middleware/auth');


orderRouter.post('/', requireAuth, placeOrder);
orderRouter.get('/', requireAuth, retrievePendingOrders);
orderRouter.get('/user', requireAuth, getUserOrders);


module.exports = orderRouter;