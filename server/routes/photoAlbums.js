const express = require('express');
const { createAlbum, getAlbums, getAlbum, deleteAlbum, deletePhoto, uploadAlbumPhotos } = require('../controllers/photoAbumsController');
const { requireAuth } = require('../middleware/auth');
const photoAlbumsRouter = express.Router();
const multer = require('multer');

const upload = multer({
    dest: "uploads/"
});

photoAlbumsRouter.post('/', requireAuth, upload.array('albumfiles', 10), createAlbum);
photoAlbumsRouter.get('/', requireAuth, getAlbums);
photoAlbumsRouter.get('/:albumId', requireAuth, getAlbum);
photoAlbumsRouter.delete('/:albumId', requireAuth, deleteAlbum);
photoAlbumsRouter.delete('/photo/:photoId', requireAuth, deletePhoto);
photoAlbumsRouter.put('/photo/:albumId', requireAuth, upload.array('photos', 10), uploadAlbumPhotos);

module.exports = photoAlbumsRouter;