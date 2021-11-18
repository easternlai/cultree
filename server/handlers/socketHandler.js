module.exports.attendEventSocket = (req, eventId, receiver) => {
    const io = req.app.get('socketio');
    io.sockets.emit('attendEvent', {eventId, receiver});
    console.log('Participant list updated.');
};

module.exports.sendNewEventSocket = (req, event, receiver) => {
    const io = req.app.get('socketio');
    io.sockets.in(receiver._id.toString()).emit('newEvent', event);
}

module.exports.deleteEventSocket = (req, eventId, receiver) => {
    console.log(eventId);
    const io = req.app.get('socketio');
    io.sockets.in(receiver._id.toString()).emit('deleteEvent', eventId);
}
