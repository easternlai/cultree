const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    date: {
        type: String,

    },
    message: String,
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    event: {
        type: Schema.ObjectId,
        ref: 'Event'
    }
});

const commentModel = mongoose.model('Comment', CommentSchema);

module.exports = commentModel;