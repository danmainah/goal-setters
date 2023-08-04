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

const indexRouter = require('./routes/index');
const activityRouter = require('./routes/activityRoute');
const userRouter = require('./routes/userRoute')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('layout', './layout/main');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.use(flash());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(session({
  secret: 'napenda',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.authenticate('session'));

app.use('/', indexRouter);
app.use('/activity', activityRouter);
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
