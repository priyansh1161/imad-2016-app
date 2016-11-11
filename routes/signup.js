var express = require('express');
var path = require('path');
var db = require('../db/config');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq88usgg'; // should be made as env variable

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}
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
       res.cookie('auth',encrypt(req.body.username),{httpOnly : true});
       res.status(200).json({msg : 'ok'});
   });
});
module.exports = router;
