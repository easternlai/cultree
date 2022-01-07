const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    date: {
        type: String,

    },
    message: String,
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    event: {
        type: Schema.ObjectId,
        ref: 'Event',
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
      },
});

const commentModel = mongoose.model('Comment', CommentSchema);

module.exports = commentModel;