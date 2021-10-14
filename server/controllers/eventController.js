const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');
const S3 = require('aws-sdk/clients/S3')
const Event = require('../models/Event');
const ParticipantList = require('../models/ParticipantList');
const User = require('../models/User');

module.exports.createEvent = async (req, res, next) => {
    const { location, date, type, caption, name, time } = req.body;
    let { image } = req.body;
    const userId = req.user.id;

    let event = undefined;
    let user = undefined;
    let s3 = undefined;
    let s3Response = undefined;
    
    try {
        user = await User.findOne({ _id: userId });
    } catch (err) {
        next(err);
    }

    try {

        if(req.file){
            const fileStream = fs.createReadStream(req.file.path);
            s3 = new S3({
                region: process.env.S3_REGION,
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY,
            });

            s3Response = await s3.upload({Bucket: process.env.S3_BUCKET, Body: fileStream, Key: req.file.filename}).promise();
            image = s3Response.Location;
        }

        event = new Event({ location, name, date, time, type, organizer: ObjectId(userId), tenantId: ObjectId(user.tenantId), caption, image });
        await event.save();
        res.send(event);

    } catch (err) {
        next(err);
    }
}

module.exports.retrieveEvents = async (req, res, next) => {
    const userId = req.user.id;

    try {
        user = await User.findOne({ _id: userId });
    } catch (err) {
        next(err);
    }

    try {
        const events = await Event.aggregate([
            {
                $match: { tenantId: user.tenantId }
            },
            {
                $lookup: {
                    from:'users',
                    localField: 'organizer',
                    foreignField: '_id',
                    as: 'organizer'
                }
            },
            {
                $unwind: '$organizer'
            },
            {
                $unset: [
                    'organizer._id',
                    'organizer.tenantId',
                    'organizer.password',
                    'organizer.admin',
                    'organizer.__v',
                    '__v',
                ]
            },  
        ]);

        return res.send(events);
    } catch (err) {

    }
}
