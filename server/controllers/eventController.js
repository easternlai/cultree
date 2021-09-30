const Event = require('../models/Event');
const ParticipantList = require('../models/ParticipantList');
const User = require('../models/User');

const ObjectId = require('mongoose').Types.ObjectId;


module.exports.createEvent = async (req, res, next ) => {
    const {location, date, type, caption, image} = req.body;
    const userId = req.user.id;

    let event = undefined;

    try {
        const user = await User.findById(userId);
        
        event = new Event ({location, date, type, organizer: ObjectId(userId), caption, image });

    } catch (err) {
        console.log('errrrrrrrrrrrrrrorrr')
        return console.log(err);
    }


    return res.send('test');
}