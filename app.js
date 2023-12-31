const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./connectdb');
const passport = require('passport');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
require('./auth/auth');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const dbpath = require('./path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('layout', './layout/main');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: 'napenda',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: dbpath })
}));


app.use(passport.authenticate('session')); // persistent login sessions
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(methodOverride('_method')); // allow Express to recognize the _method input in your form and treat the POST request as a DELETE request.

// importing routes
const indexRouter = require('./routes/index');
const activityRouter = require('./routes/activityRoute');
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');

const UserModel = require('./models/userModel'); //import user model

// Passport Local Strategy
passport.use(UserModel.createStrategy());

// To use with sessions
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

  /// add middleware to check if user is authenticated
  const checkauthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      // Redirect user to login page
      res.redirect('/login');
    }
  }

app.use('/', indexRouter);
app.use('/activity', checkauthenticated, activityRouter);
app.use('/category', checkauthenticated, categoryRouter)
app.use('/', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
module.exports = app;
