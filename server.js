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
var create = require('./routes/create');
var app = express();
app.use(morgan('dev'));
// app.set('view engine', 'ejs');
// app.use(logger('dev'));
app.use(session({
    secret : 'bifbiergbuernoerbj',
    saveUninitialized: true,
    maxAge : 70000000
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));

});
app.use('/signup',signup);
app.use('/login',login);
app.use('/create',auth,create);
// app.use(auth);
app.use('/articles',auth,articles);

// error handler
app.use(function (err,req,res,next) {
    res.send(err.message);
});
app.listen(8080);