const express = require('express');
const eventRouter = express.Router();

const {requireAuth} = require('../middleware/auth');
const { createEvent } = require('../controllers/eventController');


eventRouter.post('/', requireAuth, createEvent);

module.exports = eventRouter;
