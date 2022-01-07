const ObjectId = require("mongoose").Types.ObjectId;
const Announcement = require("../models/Announcement");
const User = require("../models/User");
const {sendDeleteAnnouncement, sendNewAnnouncement} = require('../handlers/socketHandler');

module.exports.createAnnouncement = async (req, res, next) => {
  const { bulletin } = req.body;
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (user.admin < 5) {
      return res
        .status(401)
        .send({
          msg: "You do not have permissions to perform this action.",
          admin: user.admin,
        });
    }

    const announcement = new Announcement({
      bulletin,
      company: user.tenantId,
    });

    announcement.save();

    res.send(announcement);

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

    receivers.map(receiver => {
        sendNewAnnouncement(req, {bulletin: announcement.bulletin, _id: announcement._id, date: announcement.date}, receiver);
    });

  } catch (err) {
    next(err);
  }
};

module.exports.deleteAnnouncement = async (req, res, next) => {
  const { announcementId } = req.params;

  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user || user.admin < 5) {
      return res
        .status(404)
        .send({ error: "You do not have permissions to perform this action." });
    }

    const announcement = await Announcement.findOne({
      _id: ObjectId(announcementId),
    });
    if (!announcement) {
      return res
        .status(404)
        .send({ error: "Could not find an announcement to delete." });
    }

    const deleteAnnouncement = await Announcement.deleteOne({
      _id: ObjectId(announcementId),
    });

    if (!deleteAnnouncement) {
      return res.status(500).send({ error: "Could not delete this event." });
    }

    res.send(deleteAnnouncement);
    console.log(req.user.tenantId);
    const receivers = await User.aggregate([
        {
          $match: {
            tenantId: ObjectId(req.user.tenantId),
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
        sendDeleteAnnouncement(req, { announcementId }, receiver);
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.aggregate([
      {
        $match: { company: ObjectId(req.user.tenantId) },
      },
      {
        $sort: { date: -1 },
      },
      {
          $project: {
              bulletin: true,
              _id: true,
              date: true,
          }
      }
    ]);

    res.send(announcements);
  } catch (err) {
    next(err);
  }
};
