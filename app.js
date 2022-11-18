require('./passport');
require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const session = require('express-session');
var passport = require('passport');
var config = require('./Constants');
var rateLimit = require('express-rate-limit');

var corsOptions = {
  origin: function (origin, callback) {
    if (config.url.API_URL.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

// Mongoose DB connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

app.set('trust proxy', 1);

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

// Session & Passport middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

module.exports = app;
