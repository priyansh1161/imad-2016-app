var express = require('express');
var db = require('../db/config');
var router = express.Router();
var encr = require('../util/encr');

module.exports = function (req,res,next) {
   if(req.user){
       next();
   }
   console.log(req.session);
    if (req.session && req.session.auth && req.session.auth.username){
       var username = encr.decrypt(req.session.auth.username);
       db.user.findByUserName(username,function (err,result) {
          if(err)
              return next(err);
           else
               req.session.auth = {username : encr.encrypt(result.rows[0].username) };
               req.user = result.rows[0];
               next();
       });
   }
   else
       next(new Error('You are denied access of this route'));
};