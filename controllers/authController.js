const User = require('../models/User');
const Cards = require('../models/Cards');
const Logins = require('../models/Logins');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.login = (req, res, next) => {
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

exports.verify = (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ error: err, status: 400 });
    } else {
      return res.status(200).json({ decoded, status: 200 });
    }
  });
};

exports.hint = async (req, res) => {
  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (user) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let mailOptions = {
      from: 'no-reply@odinwarden.com',
      to: user.email,
      subject: 'Odinwarden Password Hint',
      text: `Your password hint is: ${user.hint}`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ error: err, status: 500 });
      } else {
        return res.status(200).json({ info, status: 200 });
      }
    });
  } else {
    res.status(400).json({ error: 'Email not found.', status: 400 });
  }
};

exports.add_login = async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });
  if (user) {
    const item = new Logins({
      user: user._id,
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      url: req.body.url,
      note: req.body.note,
    });
    const result = await item.save().catch((err) => {
      res.status(500).json({ error: err, status: 500 });
    });
    return res.status(200).json({ result, status: 200 });
  } else {
    res.status(400).json({ error: 'Email not found.', status: 400 });
  }
};

exports.update_login = async (req, res) => {
  const user = await User.findOne({
    _id: req.body.userId,
  });
  if (user) {
    const item = await Logins.findOne({
      _id: req.body.itemId,
    });
    if (item) {
      item.name = req.body.name;
      item.username = req.body.username;
      item.password = req.body.password;
      item.url = req.body.url;
      item.note = req.body.note;
      const result = await item.save().catch((err) => {
        res.status(500).json({ error: err, status: 500 });
      });
      return res.status(200).json({ result, status: 200 });
    } else {
      res.status(400).json({ error: 'Item not found.', status: 400 });
    }
  } else {
    res.status(400).json({ error: 'Email not found.', status: 400 });
  }
};

exports.delete_login = async (req, res) => {
  const user = await User.findOne({
    _id: req.body.userId,
  });
  if (user) {
    const item = await Logins.findOne({
      _id: req.body.itemId,
    });
    if (item) {
      const result = await item.delete().catch((err) => {
        res.status(500).json({ error: err, status: 500 });
      });
      return res.status(200).json({ result, status: 200 });
    } else {
      res.status(400).json({ error: 'Item not found.', status: 400 });
    }
  } else {
    res.status(400).json({ error: 'Email not found.', status: 400 });
  }
};

exports.add_card = async (req, res) => {
  const user = await User.findOne({ _id: req.body.id });
  if (user) {
    const item = new Cards({
      user: user._id,
      name: req.body.name,
      cardholderName: req.body.cardholdername,
      cardNumber: req.body.cardnumber,
      brand: req.body.brand,
      expirationMonth: req.body.expirationMonth,
      expirationYear: req.body.expirationYear,
      cvv: req.body.cvv,
      note: req.body.note,
    });

    try {
      const result = await item.save();
      return res.status(200).json({ result, status: 200 });
    } catch (err) {
      return res.status(500).json({ error: err, status: 500 });
    }
  } else {
    res.status(400).json({ error: 'Email not found.', status: 400 });
  }
};

exports.update_card = async (req, res) => {
  const user = await User.findOne({
    _id: req.body.userId,
  });
  if (user) {
    const item = await Cards.findOne({
      _id: req.body.itemId,
    });
    if (item) {
      item.name = req.body.name;
      item.cardholderName = req.body.cardholdername;
      item.cardNumber = req.body.cardnumber;
      item.brand = req.body.brand;
      item.expirationMonth = req.body.expirationMonth;
      item.expirationYear = req.body.expirationYear;
      item.cvv = req.body.cvv;
      item.note = req.body.note;
      const result = await item.save().catch((err) => {
        res.status(500).json({ error: err, status: 500 });
      });
      return res.status(200).json({ result, status: 200 });
    } else {
      res.status(400).json({ error: 'Item not found.', status: 400 });
    }
  } else {
    res.status(400).json({ error: 'Email not found.', status: 400 });
  }
};

exports.delete_card = async (req, res) => {
  const user = await User.findOne({
    _id: req.body.userId,
  });
  if (user) {
    const item = await Cards.findOne({
      _id: req.body.itemId,
    });
    if (item) {
      const result = await item.delete().catch((err) => {
        res.status(500).json({ error: err, status: 500 });
      });
      return res.status(200).json({ result, status: 200 });
    } else {
      res.status(400).json({ error: 'Item not found.', status: 400 });
    }
  } else {
    res.status(400).json({ error: 'Email not found.', status: 400 });
  }
};

exports.get_items = async (req, res) => {
  const user = await User.findOne({
    _id: req.body.id,
  });
  if (user) {
    const logins = await Logins.find({ user: user._id });
    const cards = await Cards.find({ user: user._id });
    return res.status(200).json({ logins, cards, status: 200 });
  }
};
