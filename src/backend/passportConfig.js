const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('./models');
const User = require('./models').User;


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findById(id, done);
});

passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  // Find the user with the given username
  models.User.findOne({ email: email.toLowerCase() }, (err, user) => {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
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

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    models.User.findOne({ google: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        models.User.findOne({ email: profile.emails[0].value.toLowerCase() })
      .then((existingEmailUser) => {
        if (existingEmailUser) {
          const user = existingEmailUser;
          user.google = profile.id;
          user.name = profile.givenName;
          user.save();
          done(null, user);
        } else {
          const user = new User({
            email: profile.emails[0].value.toLowerCase(),
            google: profile.id,
            name: profile.givenName
          });
          user.save();
          done(null, user);
        }
      })
      .catch(err => done(err));
      }
    })
    .catch(err => done(err));
  }

));

module.exports = passport;
