const cookie = require('cookie');

const MAX_USERS_PER_CHAT = 2;

const socketHandler = (io, sessionStore) => (socket) => {
  // Check cookie for sessionID and check that sessionID to prove they are logged in
  if (!socket.handshake.headers.cookie) {
    console.log('Socket connection attempted without user cookie');
    return;
  }
  const tS = cookie.parse(socket.handshake.headers.cookie)['connect.sid'];
  const sessionID = tS.split('.')[0].split(':')[1];
  sessionStore.get(sessionID)
  .then((sesh) => {
    // prove they are logged in
    if (!(sesh && sesh.passport && sesh.passport.user)) {
      console.log('Socket connection attempted without user session');
      return;
    }
    // const userid = sesh.passport.user; // if we have any interest in userid it is here

    socket.on('joinQuestion', ({ room, handle }) => {
      const rooms = io.nsps['/'].adapter.rooms; // all rooms in the '/' (default) namespace

      // check if this socket allowed to join
      if (rooms[room] && rooms[room].length >= MAX_USERS_PER_CHAT) {
        socket.emit('joinResponse', { success: false });
        return;
      }

      socket.join(room);
      if (!rooms[room].handles) {
        // adding to the room obj a mapping from socketID's to desired chat handles
        rooms[room].handles = {};
      }
      rooms[room].handles[socket.id] = handle;
      // Get an array of handles from the obj (we don't need/want to send socket ids to cli)
      const inRoom = Object.keys(rooms[room].handles).map(key => rooms[room].handles[key]);
      socket.emit('joinResponse', { success: true, inRoom });
      socket.broadcast.to(room).emit('joined', { handle });
    });
  })
  .catch(error => console.log(error));
};

module.exports = socketHandler;
