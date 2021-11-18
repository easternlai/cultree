const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  date: String,
  time: String,
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

EventSchema.pre('deleteOne', async function(next){
  const eventId = this.getQuery()['_id'];
  console.log("this:", this);
  try {
    await mongoose.model('Comment').deleteMany({event: eventId});
    await mongoose.model('ParticipantsList').deleteOne({event: eventId});
    next();
  } catch (err) {
    next(err);
  }
});

const eventModel = mongoose.model('events', EventSchema);

module.exports = eventModel;