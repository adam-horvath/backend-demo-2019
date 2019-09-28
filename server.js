let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
let config = require('./config/database'); // get db config file
let port = process.env.PORT || 8080;
let app = express();

// get our request parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Use the passport package in our application
app.use(passport.initialize());

// connect to database
mongoose.connect(config.database, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

// pass passport for configuration
require('./config/passport')(passport);

app.all('/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method.toString() === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.all('/api/v1/*', [require('./app/auth/validateRequest')]);

app.use('/api', require('./routes/index'));

// If no route is matched by now, it must be a 404
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  console.log(req);
  console.log(404, 'Not found');
  next(err);
});

// Start the server
app.listen(port, '0.0.0.0');
console.log('App started on http://localhost:' + port);
