module.exports.attendEventSocket = (req, eventId, receiver) => {
    const io = req.app.get('socketio');
    io.sockets.in(receiver).emit('attendEvent', eventId);
    console.log('Participant list updated.');
};