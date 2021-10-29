const express = require('express');
const adminRouter = express.Router();

const { createUser } = require('../controllers/adminController');
const { requireAuth } = require('../middleware/auth');

adminRouter.post('/user', requireAuth, createUser);

module.exports = adminRouter;