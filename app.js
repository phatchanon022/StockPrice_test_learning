var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var Handlebars = require("handlebars");
var mongoose = require('mongoose');

var databaseConfig = require('./config/database_ex');


// Setup db connection
mongoose.connect(databaseConfig.MONGODB_URI || databaseConfig.database , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose Database is connected !!');
})


Handlebars.registerHelper('iter', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + fn(_.extend({}, context[i], { i: i, iPlus1: i + 1 }));
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});


// set static folder Public



// custom handlebar.register
Handlebars.registerHelper("checkNum", function(stock_value,v0, options) {
  if (stock_value < 0 ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stockRouter = require('./routes/stock');
var chartRouter = require('./routes/chart');
var peratioRouter = require('./routes/peratio');
var watchlistRouter = require('./routes/watchlist');
var contactRouter = require('./routes/contact');

var app = express();

// view engine setup

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));



app.set('view engine', 'handlebars');


/*
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
*/

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stock', stockRouter);
app.use('/chart', chartRouter);
app.use('/peratio', peratioRouter);
app.use('/watchlist', watchlistRouter);
app.use('/contact', contactRouter);



app.get('/config/tokens.json', function(req, res) {
  //viewname can include or omit the filename extension
  res.sendFile(__dirname +'/config/tokens.json' ); 
});


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
