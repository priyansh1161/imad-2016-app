var express = require('express');
var db = require('../db/config');
var path = require('path');
var router = express.Router();

router.get('/',function (req,res) {
    var page = req.query.page || 1;
    var offest = (page-1)*10; // 10 article per list (max)
    db.article.findAll(10,offest,function (err,result) {
        if(err){
            //handle err
            res.sendFile(path.join(__dirname, '..', 'views', 'error.html'));
        }
        else{

        }
    })
});