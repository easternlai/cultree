const User = require('../models/User');
const Comment = require('../models/Comment');
const ObjectId = require('mongoose')

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
    console.log(user);

    const comment = new Comment({
        message,
        author: userId,
        event: eventId
    })

    await comment.save();

    return res.send({...comment.toObject(), author:{ email: user.email, fullName: user.fullName}});
    
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