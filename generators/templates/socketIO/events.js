exports = module.exports = function(io) {

  io.on('connection', function(socket) {

    console.log('A user connected');
    // Accept a login event with user's data
    socket.on("login", function(message) {
      // console.log(message)
      // socket.handshake.session.user = {
      //   username: 'jorgei'
      // }
      // socket.handshake.session.save();
      if (typeof message !== 'undefined' && message && typeof message.user !== 'undefined' && message.user) {
        // console.log(socket.handshake.session);
        // console.log(socket.id);
        socket.handshake.session.socketID = socket.id;
        socket.handshake.session.socketName = message.user.username || socket.id;
        socket.handshake.session.save();
      }
    });
    socket.on("logout", function(userdata) {
      if (socket.handshake.session.userdata) {
        delete socket.handshake.session.userdata;
        socket.handshake.session.save();
      }
    });
  });
}
