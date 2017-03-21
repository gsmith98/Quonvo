const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const flash = require('connect-flash');

const connect = process.env.MONGODB_URI;
const DEVPORT = 3000;

const app = express();

const REQUIRED_ENV = 'SECRET MONGODB_URI'.split(' ');

REQUIRED_ENV.forEach((el) => {
  if (!process.env[el]) {
    console.error(`Missing required env var ${el}`);
    process.exit(1);
  }
});

mongoose.Promise = global.Promise;
mongoose.connect(connect);

const models = require('./models');
const auth = require('./routes/auth');
const questionRoutes = require('./routes/questions');

// Set up of the build
app.use(express.static('build'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection });
const sessionMiddleware = session({
  secret: process.env.SECRET,
  store: mongoStore
});


passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser');
  models.User.findById(id, done);
});

// Passport stuff
app.use(sessionMiddleware);

passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  // Find the user with the given username

  models.User.findOne({ email: email.toLowerCase() }, (err, user) => {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.error('Error fetching user in LocalStrategy', err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      return done(null, false, { message: `${email} not found` });
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    // TODO add bcrypt and hashing. This can be done as a method on the user
    // object or directly in here.
    // auth has succeeded
    return done(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));
app.use('/', questionRoutes);

// TODO once more routes are added, add them here.

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || DEVPORT, () => {
  console.log(`Express running on port ${process.env.PORT || DEVPORT}!`);
});
