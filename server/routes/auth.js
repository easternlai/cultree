const express = require('express');
const authRouter = express.Router();
const {register} = require('../controllers/authController');

authRouter.post('/register', register);

module.exports= authRouter;