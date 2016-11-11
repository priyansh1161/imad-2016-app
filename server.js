var express = require('express');
var morgan = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session =  require('express-session');
 require('./db/config');
var signup = require('./routes/signup');

var app = express();
app.use(morgan('dev'));
app.set('view engine', 'ejs');
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret : 'x44'
  ,resave: true
  ,saveUninitialized: true }));
app.use('/signup',signup);
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'views', 'error.html'));

});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = process.env.PORT || 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
