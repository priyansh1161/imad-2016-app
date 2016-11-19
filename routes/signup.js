var express = require('express');
var path = require('path');
var db = require('../db/config');
var encr = require('../util/encr');
var router = express.Router();

router.get('/',function (req,res) {
    res.sendFile(path.join(__dirname,'..','views','signup.html'));
});
router.post('/',function (req,res) {
   console.log(req.body);
   db.user.createUser(req.body,function (err,result) {
       if(err)
           return res.status(500).json(err);
       // attach cookie to res
       //  (username) + encryption key = auth hash
       res.session.auth = encr.encrypt(req.body.username);
       res.status(200).json({msg : 'ok'});
   });
});
module.exports = router;
