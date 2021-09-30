const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipantListSchema = new Schema ({
    event: {
        type: Schema.ObjectId,
        ref: 'Event'
    },
    list: [{ attendee: { type: Schema.ObjectId, ref: 'User'}}]
});

const ParticipantListModel = mongoose.model('ParticipantList',ParticipantListSchema);

module.exports = ParticipantListModel;