var mongoose = require('mongoose');
var User = require('../models/user.model');
var Qst = require('../models/question.model');

var methods = {};

methods.findAllQst = function(cb){
    Qst.find({},function(err,qst){
            cb(err,qst);
    });
}
methods.findByUser = function(user,cb){
    Qst.find({'createdBy.id' : user },function(err,qsts){
        cb(err,qsts);
    });
}
methods.findQst = function(id,cb){
    Qst.findOne({_id : id },function(err,qst){
        cb(err,qst);
    });
}
methods.findAndUpdate = function(id,currAns,cb){
    Qst.findOne({_id : id },function(err,qst){
        var flag = true;
        for(var i=0;(i<qst.options.length)&&flag;i++){
             console.log(qst.options[i].field,qst.options[i].value)
            if(qst.options[i].field===currAns){
                qst.options[i].value++;
               
                flag=false;
            }
        }

    Qst.findOneAndUpdate({_id : id},qst,{new: true} ,function(err,qst){
        cb(err,qst);
    });
    });
}
methods.findAndDelete = function(id,cb){
    Qst.remove({_id : id} , function(err){
        cb(err);
    })
}

module.exports = methods;