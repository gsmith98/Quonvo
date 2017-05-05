const cookie = require('cookie');

const MAX_USERS_PER_CHAT = 2;

const socketHandler = (io, sessionStore) => (connection) => {
  const socket = connection;

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

    // TODO right now, Chat handlers are set on Main sockets and vice versa. io() to diff routes?
    // ========================================================
    // ======                CHAT SOCKETS                ======
    // ========================================================

    // this channel is used to create a question and to answer one
    // in Quonvo, a given chat socket should only ever join one question.
    // in fact it should always join a question immediately after being established
    // so sockets have a 1 to 1 relationship with questions/chats
    socket.on('joinQuestion', ({ room, handle }) => {
      const rooms = io.nsps['/'].adapter.rooms; // all rooms in the '/' (default) namespace

      // check if this socket allowed to join
      if (rooms[room] && rooms[room].length >= MAX_USERS_PER_CHAT) {
        socket.emit('joinResponse', { success: false, reason: 'That question is already being answered.' });
        return;
      }
      if (socket.room) {
        socket.emit('joinResponse', { success: false, reason: 'This socket is already involved with a question.' });
        return;
      }

      socket.join(room);
      socket.room = room;
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

    // this channel is used to send messages in a chat
    socket.on('sendMessage', ({ message }) => {
      if (!socket.room) {
        socket.emit('sendResponse', { success: false, reason: 'There\'s no chat to send the message to.' });
        return;
      }

      const from = io.nsps['/'].adapter.rooms[socket.room].handles[socket.id];
      socket.broadcast.to(socket.room).emit('message', { message, from });
      socket.emit('sendResponse', { success: true });
    });

    socket.on('endChat', () => {
      if (!socket.room) {
        socket.emit('sendResponse', { success: false, reason: 'There\'s no chat to end.' });
        return;
      }

      // TODO end chat stuff
      socket.broadcast.to(socket.room).emit('chatEnded');
      socket.emit('endChatResponse', { success: true });
    });


    // ========================================================
    // ======                MAIN SOCKETS                ======
    // ========================================================
    socket.on('joinMain', () => {
      socket.join('MainRoom'); // The main room that all current users join
    });

    // TODO you can emit to the MainRoom to tell all users when there's a new question

    // Respond to connector that all sockets have been set up
    socket.emit('connectionComplete', {});
  })
  .catch(error => console.log(error));
};

module.exports = socketHandler;
