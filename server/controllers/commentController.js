const User = require('../models/User');
const Comment = require('../models/Comment');
const ObjectId = require('mongoose');
const moment = require('moment');

module.exports.createComment = async (req, res, next) => {
    const {eventId} = req.params;
    const {message} = req.body;
    const userId = req.user.id;
    let user = undefined;
 
        if(!message){
            return res.status(400).send({error: "Please provide a comment."});
        }

        if (!eventId){
            return res.status(400).send({error: "Please provide the event you wish to leave a comment for. "});
        }

    try {
        user = await User.findOne({_id: userId});
    } catch (err) {
        next(err);
    }

    const comment = new Comment({
        message,
        author: userId,
        event: eventId,
        date: moment().format()
    })

    await comment.save();

    return res.send({...comment.toObject(), author:{ email: user.email, fullName: user.fullName, _id: user._id}});
    
}

module.exports.retrieveComments = async (req, res, send) => {
    const {eventId} = req.params;
    try {
        const comments = await Comment.find({event: eventId});

        res.send({comments, commentsCount: comments.length});
    } catch (err) {
        next(err);
    }
}

module.exports.deleteComment = async (req, res, next) => {
    const {commentId} = req.params;
    const userId = req.user.id;

    try {

        const comment = await Comment.findOne({_id: commentId});
        
        if(!comment){
            return res.status(404).send({error: "We could not find a comment associated with this user."});
        }

        const commentDelete = await Comment.deleteOne({_id: commentId});

        if(!commentDelete){
            return res.status(500).send({error: "Could not delete this comment."});
        }
        
        res.status(240).send();
        
    } catch (err) {
        next(err);
    }
}