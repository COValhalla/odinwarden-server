const User = require('../models/User');
const Items = require('../models/Items');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.login = (req, res) => {
  res.json('Not implemented yet.');
};

exports.logout = (req, res) => {};

exports.register = async (req, res, next) => {
  // Confirm unique email
  const user = await User.findOne({ email: req.body.email.toLowerCase() });

  if (user) {
    res.status(403).json({ error: 'Email already exists.', status: 403 });
  } else {
    const hashedPassword = await bcrypt.hashSync(
      req.body.password,
      10,
      (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        // return hashed password
        return hashedPassword;
      },
    );

    // Create new user
    const newUser = new User({
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      name: req.body.name,
      hint: req.body.passwordHint,
    });
    // Save new user
    const result = await newUser.save().catch((err) => {
      res.status(500).json({ error: err, status: 500 });
    });

    // Authenticates newly created user
    passport.authenticate(
      'local',
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(400).json({
            message: info.message,
            status: 400,
          });
        }
        req.logIn(user, { session: false }, function (err) {
          if (err) {
            return next(err);
          }
          // Create JWT
          const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
          );
          return res.status(200).json({ user, token, status: 200 });
        });
      },
    )(req, res, next);
  }
};
