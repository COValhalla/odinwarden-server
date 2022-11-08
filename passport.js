const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

// Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            return done(null, user);
          } else {
            // passwords do not match!
            return done(null, false, { message: 'Incorrect password' });
          }
        });
      });
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, cb) {
      //find the user in db if needed
      return User.findById(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    },
  ),
);
