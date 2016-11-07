var express = require('express');
var morgan = require('morgan');
var path = require('path');
<<<<<<< HEAD

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
=======
// var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var passport = require('passport');
var session =  require('express-session');
// var mongoose = require('mongoose');

// var routes = require('./routes/index');
// var users = require('./routes/users');
// var auth = require('./routes/auth');
// var polls = require('./routes/polls');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// mongoose.connect('mongodb://test:test@ds011785.mlab.com:11785/vote8er');
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('App listening on port 3000!');
});

 // app.use(favicon());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({ secret : 'x44'
                // ,resave: true
                //  ,saveUninitialized: true }));

// require('./config/passport')(app); // setting passport and adding its stategies
// app.use('/', routes);
// app.use('/users', users);
// app.use('/auth',auth);
// app.use('/polls',polls);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
>>>>>>> 6363b5dc213355012e8a8397e623f451446c02c7
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
