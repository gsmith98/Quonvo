const cookie = require('cookie');
const models = require('./models');

const socketHandler = mongoStore => (connection) => {
  const socket = connection;

  // Get user out of cookie and attach to this socket
  if (!socket.handshake.headers.cookie) {
    console.log('Socket connection attempted without user cookie');
    return;
  }
  const tS = cookie.parse(socket.handshake.headers.cookie)['connect.sid'];
  const sessionID = tS.split('.')[0].split(':')[1];
  mongoStore.get(sessionID)
  .then(sesh => models.User.findById(sesh.passport.user))
  .then((user) => { socket.user = user; })
  .catch(error => console.log(error));

  // past this point, socket.user can be used in each socket.on
  // TODO right now, the user object is grabbed at socket connection time.
  //    if it is changed in mongo while the connection is open the changes
  //    may not be reflected. Rather than grab the user object on connection,
  //    should we grab it anew within each .on? This is what passport does
};

module.exports = socketHandler;
