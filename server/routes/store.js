const express = require('express');
const { createProduct, getProducts } = require('../controllers/storeController');
const storeRouter = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'temp/',
    limits: { fileSize: 10*1024*1024}
}).single('file');
const rateLimit = require('express-rate-limit');
const imageLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
});

const {requireAuth} = require('../middleware/auth');

storeRouter.post('/', imageLimiter, requireAuth, upload, createProduct);
storeRouter.get('/', requireAuth, getProducts);


module.exports = storeRouter;
