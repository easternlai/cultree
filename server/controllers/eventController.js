const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const S3 = require("aws-sdk/clients/S3");
const Event = require("../models/Event");
const ParticipantList = require("../models/ParticipantList");
const Comment = require("../models/Comment");
const User = require("../models/User");

const {
  sendNewEventSocket,
  sendDeleteEventSocket,
  attendEventSocket,
} = require("../handlers/socketHandler");

module.exports.createEvent = async (req, res, next) => {
  const { location, address, date, type, caption, name, time, imageLink } = req.body;
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
    if (req.file) {
      const fileStream = fs.createReadStream(req.file.path);
      s3 = new S3({
        region: process.env.S3_REGION,
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      });

      s3Response = await s3
        .upload({
          Bucket: process.env.S3_BUCKET,
          Body: fileStream,
          Key: req.file.filename,
        })
        .promise();
      image = s3Response.Location;
    }

    event = new Event({
      location,
      address,
      name,
      date,
      time,
      type,
      organizer: ObjectId(userId),
      tenantId: ObjectId(user.tenantId),
      caption,
      image: image || imageLink,
    });
    const participantList = new ParticipantList({
      event: event._id,
    });

    await event.save();
    await participantList.save();
    res.send({
      ...event.toObject(),
      participantsList: [],
      organizer: { fullName: user.fullName, email: user.email },
    });
    //Socket Handler
    const receivers = await User.aggregate([
      {
        $match: {
          tenantId: user.tenantId,
        },
      },
      {
        $project: {
          _id: true,
        },
      },
    ]);
    receivers.map((receiver) => {
      sendNewEventSocket(
        req,
        {
          ...event.toObject(),
          participantsList: [],
          organizer: { fullName: user.fullName, email: user.email },
        },
        receiver
      );
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteEvent = async (req, res, next) => {
  const { eventId } = req.params;
  const userId = req.user.id;

  try {
    const event = await Event.findOne({ _id: eventId, organizer: userId });

    if (!event) {
      return res
        .status(404)
        .send({ error: "Could not find an event associated with this user." });
    }

    const eventDelete = await Event.deleteOne({
      _id: eventId,
    });

    if (!eventDelete.deletedCount) {
      return res.status(500).send({ error: "Could not delete this event." });
    }

    res.status(204).send();

    const receivers = await User.aggregate([
      {
        $match: {
          tenantId: user.tenantId,
        },
      },
      {
        $project: {
          _id: true,
        },
      },
    ]);
    console.log(receivers);

    receivers.map((receiver) => {
      sendDeleteEventSocket(req, { eventId }, receiver);
    });
  } catch (err) {
    next(err);
  }
};

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
        $match: { tenantId: user.tenantId },
      },
      {
        $sort: { date: 1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "organizer",
          foreignField: "_id",
          as: "organizer",
        },
      },
      {
        $lookup: {
          from: "participantslists",
          localField: "_id",
          foreignField: "event",
          as: "participantsList",
        },
      },
      {
        $unwind: "$organizer",
      },
      {
        $unwind: "$participantsList",
      },
      {
        $unset: [
          "organizer.tenantId",
          "organizer.password",
          "organizer.admin",
          "organizer.__v",
          "__v",
        ],
      },
      {
        $addFields: { participantsList: "$participantsList.list" },
      },
    ]);

    return res.send(events);
  } catch (err) {}
};

module.exports.getEvent = async (req, res, next) => {
  const { eventId } = req.params;

  try {

    const event = await Event.aggregate([
      {
        $match: {tenantId: ObjectId(req.user.tenantId)}
      },
      {
        $match: { _id: ObjectId(eventId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "organizer",
          foreignField: "_id",
          as: "organizer",
        },
      },
      {
        $unwind: "$organizer",
      },

      {
        $unset: [
          "organizer.tenantId",
          "organizer.password",
          "organizer.admin",
          "organizer.__v",
          "__v",
        ],
      },
    ]);

    const list = await ParticipantList.aggregate([
      {
        $match: { event: ObjectId(eventId) },
      },
      {
        $unwind: {
          path: "$list",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "list.attendee",
          foreignField: "_id",
          as: "list.attendee",
        },
      },
      {
        $unwind: {
          path: "$list.attendee",
        },
      },
      {
        $addFields: {
          fullName: "$list.attendee.fullName",
        },
      },
      {
        $project: {
          fullName: true,
          _id: false,
        },
      },
    ]);

    const messages = await Comment.aggregate([
      {
        $match: { event: ObjectId(eventId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $unwind: "$users",
      },
      {
        $addFields: {
          author: {
            email: "$users.email",
            fullName: "$users.fullName",
            _id: "$users._id",
          },
        },
      },
    ]);

    return res.send({
      ...event[0],
      participantsList: list,
      comments: messages,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.attendEvent = async (req, res, next) => {
  const { eventId } = req.params;
  const user = req.user;
  try {
    const attendEventUpdate = await ParticipantList.updateOne(
      {
        event: eventId,
        "list.attendee": { $ne: user.id },
      },
      {
        $push: { list: { attendee: user.id } },
      }
    );
    if (attendEventUpdate.modifiedCount == 0) {
      const unattendEventUpdate = await ParticipantList.updateOne(
        {
          event: eventId,
        },
        {
          $pull: { list: { attendee: user.id } },
        }
      );
      if (unattendEventUpdate.modifiedCount == 0) {
        return res.status(500).send({ error: "Could not remove attendee." });
      }
    }

    const receivers = await User.aggregate([
        {
          $match: {
            tenantId: ObjectId(user.tenantId),
          },
        },
        {
          $project: {
            _id: true,
          },
        },
      ]);
      const filteredReceivers = receivers.filter((receiver)=> receiver._id.toString() !== user.id.toString());
      
    filteredReceivers.map((receiver) => attendEventSocket(req, {eventId, userId: user.id}, receiver));

  } catch (err) {
    next(err);
  }
};
