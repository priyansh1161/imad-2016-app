var express  = require('express');
var path = require('path');
var db = require('../db/config');
var router = express.Router();

router.get('/new',function (req,res) {
    console.log('nsgdfgdfhsdfh');
    if(req.user.admin == true){
        res.sendFile(path.join(__dirname, '..', 'views', 'new.html'));
    } else {
        res.sendStatus(403).send('You shall not pass');
    }
});

router.post('/new',function (req,res) {
    if (req.user && req.user.admin){
        console.log(req.body);
        db.article.createArticle(req.body,req.user.username,function (err,result) {
            if(err)
                res.sendFile(path.join(__dirname, '..', 'views', 'error.html'));
            else{
                res.redirect('/articles');
            }

        });
    }
    else
        res.sendStatus(403).send('You shall not pass');
});
module.exports = router;