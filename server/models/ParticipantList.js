const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantsListSchema = new Schema({
  event: {
    type: Schema.ObjectId,
    ref: "Event",
  },
  list: [{ attendee: { type: Schema.ObjectId, ref: "User" } }],
});

const ParticipantsListModel = mongoose.model(
  "ParticipantsList",
  ParticipantsListSchema
);

module.exports = ParticipantsListModel;
