const express = require('express');
const announcementRouter = express.Router();
const { createAnnouncement, getAnnouncements, deleteAnnouncement } = require('../controllers/announcementController');
const { requireAuth } = require('../middleware/auth');

announcementRouter.post('/', requireAuth, createAnnouncement);
announcementRouter.get('/', requireAuth, getAnnouncements);
announcementRouter.delete('/:announcementId', requireAuth, deleteAnnouncement);

module.exports = announcementRouter;