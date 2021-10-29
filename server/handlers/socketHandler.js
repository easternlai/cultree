module.exports.attendEventSocket = (req, eventId, receiver) => {
    const io = req.app.get('socketio');
    io.sockets.emit('attendEvent', {eventId, receiver});
    console.log('Participant list updated.');
};

module.exports.sendNewEvent = (req, event, receiver) => {
    console.log(receiver)
    console.log(receiver._id.toString());
    const io = req.app.get('socketio');
    io.sockets.in(receiver._id.toString()).emit('newEvent', event);
}