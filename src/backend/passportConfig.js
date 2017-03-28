const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('./models');

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser');
  models.User.findById(id, done);
});

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
      console.log('no user auth fail');
      return done(null, false, { message: `${email} not found` });
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      console.log('pass mismatch auth fail');
      return done(null, false, { message: 'Incorrect password.' });
    }
    // TODO add bcrypt and hashing. This can be done as a method on the user
    // object or directly in here.
    // auth has succeeded
    console.log('auth success');
    return done(null, user);
  });
}));

module.exports = passport;
