var express = require('express');
var morgan = require('morgan');
var path = require('path');
// var sessions = require('express-session');
var bodyParser = require('body-parser');
var session =  require('express-session');
 require('./db/config');
var signup = require('./routes/signup');
var login = require('./routes/login');
var auth = require('./routes/auth');
var articles = require('./routes/articles');
var app = express();
app.use(morgan('dev'));
// app.set('view engine', 'ejs');
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret : 'bifbiergbuernoerbj'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/signup',signup);
app.use('/login',login);
app.use(auth);
app.use('/articles',articles);
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'views', 'error.html'));

});
// error handler
app.use(function (err,req,res,next) {
    res.send(err.message);
});