const express = require('express');
const { createComment, retrieveComments, deleteComment } = require('../controllers/commentController');
const { requireAuth } = require('../middleware/auth');
const commentRouter = express.Router();

commentRouter.post('/:eventId', requireAuth, createComment);
commentRouter.get('/:eventId', requireAuth, retrieveComments);
commentRouter.delete('/:commentId', requireAuth, deleteComment);

module.exports = commentRouter;