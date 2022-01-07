const express = require('express');
const adminRouter = express.Router();

const { createUser, retrieveUsers, editUser, getOrders, changeOrderStatus } = require('../controllers/adminController');
const { requireAuth } = require('../middleware/auth');

adminRouter.post('/user', requireAuth, createUser);
adminRouter.get('/user', requireAuth, retrieveUsers);
adminRouter.put('/user', requireAuth, editUser);
adminRouter.get('/store/:orderStatus', requireAuth, getOrders);
adminRouter.put('/store/changestatus', requireAuth, changeOrderStatus);

module.exports = adminRouter;