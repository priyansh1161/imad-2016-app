var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../config/database');
/* GET users listing. */
router.use('/', function(req, res, next) {
  if (!req.user)
    res.redirect('/');
  else
    next();
})

router.get('/', function(req, res) {
  // res.send('respond with a resource');
  console.log(req.user  , " this");
  // fethch all the questions avalable
db.findAllQst(function(err,qst){
  if(err)
    req.redirect(err);
    else{
      console.log(qst);
         res.render('user' , {name :req.user.displayName, img : req.user.img ,qst : qst});
    }
});
});
router.get('/logout',function(req,res){
        req.session.destroy(); //Destroy current session. this generate new session for next req.
        req.logout();
        res.redirect('/');
});

router.get('/myPolls',function(req,res){
        db.findByUser(req.user._id,function(err,qst){
          if(err)
    req.redirect(err);
    else{
      console.log(qst);
         res.render('myPolls' , {name :req.user.displayName, img : req.user.img ,qst : qst});
    }

        });

});

module.exports = router;