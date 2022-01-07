const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({

    caption: {
        type: String,
    },
    album: {
        type: Schema.ObjectId,
        ref: 'Album',
    },
    image: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'User',
    }
});

const PhotoModel = mongoose.model('Photo', PhotoSchema);

module.exports = PhotoModel;