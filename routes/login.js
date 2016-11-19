var express = require('express');
var db = require('../db/config');
var encr = require('../util/encr');
var router = express.Router();

router.post('/',function (req,res) {
    if(req.body.username && req.body.password){
        db.user.validateUser(req.body.username,req.body.password,null,function (err,result) {
           if(err)
               req.sendStatus(500).json({msg : err.message});
            else
                req.session.auth = { username : encr.encrypt(req.body.username)};
                res.redirect('/articles');
        });
    }
});
module.exports = router;