var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var passport = require('passport');

/* GET home page. */

router.get('/', function(req, res) {
   if(req.isAuthenticated()){
    res.redirect('/users');
  }
  else{
    fs.readFile(path.join(__dirname , '..' ,'views/index.html'),'utf-8',function(err,index){
        if(err)
          res.send(err);
        else
          res.send(index);
    });
  }
});

module.exports = router;
