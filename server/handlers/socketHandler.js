module.exports.attendEventSocket = (req, {eventId, userId}, receiver) => {
    const io = req.app.get('socketio');
    console.log('receiver: ', receiver);
    io.sockets.in(receiver._id.toString()).emit('attendEvent', {eventId, userId});
    
};

module.exports.sendNewEventSocket = (req, event, receiver) => {
    const io = req.app.get('socketio');
    console.log('receiver: ', receiver);
    io.sockets.in(receiver._id.toString()).emit('newEvent', event);
}

module.exports.deleteEventSocket = (req, eventId, receiver) => {
    console.log('receiver: ', receiver);
    const io = req.app.get('socketio');
    io.sockets.in(receiver._id.toString()).emit('deleteEvent', eventId);
}
