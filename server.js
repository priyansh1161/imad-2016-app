var express = require('express');
var morgan = require('morgan');
var path = require('path');
// require('.db/config');
var Pool = require('pg').Pool;
var config = {
  user : 'priyansh1161',
  database : 'priyansh1161',
  password : process.env.DB_PASSWORD || 'db-priyansh1161-66700',
  port : '5432',
  host : 'db.imad.hasura-app.io'
};
var pool = new Pool(config);


var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  pool.query('SELECT * FROM "Users"',function (err,res,done) {
    if(err)
      req.send(err);
    else
      req.send(res);
  });
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
