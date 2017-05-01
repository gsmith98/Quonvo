const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const auth = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const activeChatRoutes = require('./routes/activeChats');
const messageRoutes = require('./routes/messages');
const archivedChatRoutes = require('./routes/archivedChats');
const passport = require('./passportConfig');
const socketHandler = require('./socketConfig');

const connect = process.env.MONGODB_URI;
const DEVPORT = 3000;

const app = express();
app.use((req, res, next) => {
  // allows the webpack-dev-server to use this server
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const REQUIRED_ENV = 'SECRET MONGODB_URI'.split(' ');

REQUIRED_ENV.forEach((el) => {
  if (!process.env[el]) {
    console.error(`Missing required env var ${el}`);
    process.exit(1);
  }
});

console.log('env', process.env.NODE_ENV);

mongoose.Promise = global.Promise;
mongoose.connect(connect);

// all files in build/public are publically available through /public route
app.use('/public', express.static('build/public'));

// login (home/splash) page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/login.html'));
});

app.use(flash());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection });
app.use(session({
  secret: process.env.SECRET,
  store: mongoStore
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', auth(passport));
app.use((req, res, next) => {
  if (!req.user) {
    return res.format({
      'text/html': () => res.redirect('/login'),
      'application/json': () => res.json({ response: 'You are not logged in' })
    });
  }
  return next();
});

app.use('/', questionRoutes);
app.use('/', activeChatRoutes);
app.use('/', messageRoutes);
app.use('/', archivedChatRoutes);
app.get('/assets/:asset', (req, res) => {
  res.sendFile(path.join(__dirname, `../../assets/${req.params.asset}`));
});

// the '/' route is as follows
// In production: main app (after login)
// In dev (3000) (after building webpack): postman tool (after login) (main page on /Temp)
// In webpack dev server (8080) (this file isn't used): postman tool (main page on /Temp)
// This route is a '*' for use by react-router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ******Socket Stuff***********
const server = require('http').createServer(app);
const socketIo = require('socket.io');

const io = socketIo.listen(server);
io.on('connection', socketHandler(io, mongoStore));


server.listen(process.env.PORT || DEVPORT, () => {
  console.log(`Express running on port ${process.env.PORT || DEVPORT}!`);
});
