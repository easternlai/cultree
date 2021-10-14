const express = require('express');
const eventRouter = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'temp/',
    limits: { fileSize: 10*1024*1024}
}).single('file');
const rateLimit = require('express-rate-limit');
const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
});

const {requireAuth} = require('../middleware/auth');
const { createEvent, retrieveEvents } = require('../controllers/eventController');

eventRouter.post('/', postLimiter, requireAuth, upload, createEvent);
eventRouter.get('/', requireAuth, retrieveEvents);

module.exports = eventRouter;
