var express = require('express');
var mongoose = require('mongoose');
var Qst = require('../models/question.model');
var db = require('../config/database.js');
 var router = express.Router();

router.get('/find/:pageId',function(req,res){
        var pageId = req.params.pageId;
        console.log('fgh',pageId);
        db.findQst(pageId,function(err,qst){
            if(err)
                res.send(err);
            else if(!qst){
                var error = new Error("Invalid parameters");
                res.send(error);
            }
            else {
                console.log(qst,"vg");
                if(req.isAuthenticated())
                    res.render('page', {name :req.user.displayName, img : req.user.img ,qst : qst});
                else
                     res.render('page',{name :'Log in' ,qst : qst});
                // res.end();
            }
        });

 });

 router.put('/answer',function(req,res){
     var qstId = req.body.qst;
     var currAns = req.body.currAns;
     db.findAndUpdate(qstId,currAns,function(err,qst){
            console.log(qst,"dxfcgvhbj");
            if(err)
                res(err);
            else
                res.send('200',{qst:qst});
     });
 })

//secured end points

 router.use('/',function(req,res,next){
     if(req.isAuthenticated())
        next();
    else{
        res.redirect('/');
    }
 });
// post is for creating and put is for updating
 router.post('/',function(req,res){
     console.log(req.body,req.user.displayName);
    qst = new Qst({
        question : req.body.question,
         createdBy : {name : req.user.displayName,
                    id : req.user._id
            },
        options: req.body.options,
    });
    qst.save(function(err,qst){
        if(err){
            console.log('database error',err);
            res.json('500',{err : 'Internal Server Problem'});
        }
        else
            res.json('200',{status : 'Done' , id : qst._id});
    });

 });
//render page for new polls
 router.get('/new',function(req,res){
    res.render('newPolls' ,{name :req.user.displayName, img : req.user.img });
 });
 
router.delete('/delete',function(req,res){
    db.findAndDelete(req.body._id ,function(err){
        if(err)
            res.send('500',err);
        else
            res.send('200',{status : true});
    })
});

 module.exports = router;