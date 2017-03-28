const cookie = require('cookie');

const socketHandler = mongoStore => (socket) => {
  socket.emit('heyo', { data: 'mayo' });

  console.log('1:', socket.handshake.headers.cookie);
  const tS = cookie.parse(socket.handshake.headers.cookie)['connect.sid'];
  console.log('2:', tS);
  const sessionID = tS.split('.')[0].split(':')[1];
  console.log('3:', sessionID);
  mongoStore.get(sessionID, (err, sesh) => {
    console.log('4:', sesh);
    console.log('5:', sesh.passport);
  });
};

module.exports = socketHandler;
