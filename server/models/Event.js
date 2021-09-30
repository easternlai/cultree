const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  location: String,
  date: String,
  type: String,
  organizer: {
    type: Schema.ObjectId,
    ref: "User",
  },
  tenantId: {
    type: Schema.ObjectId,
    ref: 'Company',
    required: true,
},
  caption: String,
  image: String,
});

//pre delete, delete comment and participant list


const eventModel = mongoose.model('events', EventSchema);

module.exports = eventModel;