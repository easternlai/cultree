module.exports.attendEventSocket = (req, {eventId, userId}, receiver) => {
    const io = req.app.get('socketio');
    io.sockets.in(receiver._id.toString()).emit('attendEvent', {eventId, userId});
    
};

module.exports.sendNewEventSocket = (req, event, receiver) => {
    const io = req.app.get('socketio');
    io.sockets.in(receiver._id.toString()).emit('newEvent', event);
}

module.exports.sendDeleteEventSocket = (req, eventId, receiver) => {
    const io = req.app.get('socketio');
    io.sockets.in(receiver._id.toString()).emit('deleteEvent', eventId);
}

module.exports.sendNewAnnouncement = (req, announcement, receiver) => {
    const io = req.app.get('socketio');
    io.sockets.in(receiver._id.toString()).emit('newAnnouncement', announcement);
}

module.exports.sendDeleteAnnouncement = (req, announcementId, receiver) => {
    console.log(announcementId);
    const io = req.app.get('socketio');
    io.sockets.in(receiver._id.toString()).emit('deleteAnnouncement', announcementId);
}

