const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({
    bulletin: { 
        type: String,
        required: true,
    },
    company: {
        type: Schema.ObjectId,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const announcmentModel = mongoose.model('Announcement',AnnouncementSchema);

module.exports = announcmentModel;