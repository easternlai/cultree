const express = require('express');
const eventRouter = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'temp/',
    limits: { fileSize: 10*1024*1024}
}).single('file');
const rateLimit = require('express-rate-limit');
const eventLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
});

const {requireAuth} = require('../middleware/auth');
const { createEvent, retrieveEvents, attendEvent } = require('../controllers/eventController');

eventRouter.post('/', eventLimiter, requireAuth, upload, createEvent);
eventRouter.get('/', requireAuth, retrieveEvents);
eventRouter.post('/:eventId/attend', requireAuth, attendEvent);

module.exports = eventRouter;
