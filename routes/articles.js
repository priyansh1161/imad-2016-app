var express = require('express');
var db = require('../db/config');
var path = require('path');
var fs = require('fs');
var router = express.Router();
function truncateString(str, num) {
    if(str.length  <= num)
        return str;
    if(num<=3){
        str=str.slice(0,num);
        return str + "...";}

    str=str.slice(0,num-3);
    return str+"...";
}
var makeHtml = function (obj,rowCount,req,res) {
    // not sure if imad supports node 6.4+ hence not using promises. get redy for callback hell
    // forgive me
    var list = '';
    var card = `<div class="col s12 m6">
            <div class="card blue-grey darken-1 hoverable">
                <div class="card-content white-text">
                    <span class="card-title">{{title}}</span>
                    <p>{{info}}</p>
                </div>
                <div class="card-action">
                    <a>{{category}}</a>
                    <a href="/articles/find/{{ID}}">Read more</a>
                </div>
            </div>
        </div>`;

    for(var i=0;i<obj.length;i++) {
       var temp = card.replace(/{{(\w+)}}/ig, function (full, $1) {
            if ($1 === 'info')
                return truncateString(obj[i].body, 255);
            if (obj[i][$1])
                return obj[i][$1];
        });
        list+=temp;
    }
    console.log(list);
    var pagination = `<ul class="pagination center "><li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>`;
    for(var i =1;i<=Math.min(10,Math.ceil(rowCount/10));i++){
        if(req.query.page == i)
            pagination += `<li class="waves-effect active blue-grey"><a href="${req.query.page*i}">${req.query.page*i}</a></li>`;
        else
        pagination += `<li class="waves-effect"><a href="/articles/${req.query.page*i}">${req.query.page*i}</a></li>`
    }
    pagination+=`<li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>`;
    fs.readFile(path.join(__dirname, '..', 'views', 'articles.html'),'utf-8',function (err,file) {
        if(err) {
            console.log(err);
            res.sendFile(path.join(__dirname, '..', 'views', 'error.html'));
        }
        else {
            console.log(file);
           var result = file.replace(/{{(\w+)}}/ig,function(full,$1){
               console.log(full,$1);
                if($1 === 'list')
                    return list;
                if($1 === 'pagination')
                    return pagination;
            });
            res.send(result);
        }
    });
};
var makeArticle = function (article,comments,req,res) {
    var comm = '';
    for(var i=0;i<comments.length;i++){
        comm += `<div>
                <span class="">${comments[i].created_by}</span><br/>
                <span class="">${comments[i].created_on}</span>
                <p>${comments[i].comment}</p>
            </div>
            <hr>`;
    }
    fs.readFile(path.join(__dirname, '..', 'views', 'article.html'),'utf-8', function (err,file) {
        if(err)
            res.sendFile(path.join(__dirname, '..', 'views', 'error.html'));
        else {
             var result = file.replace(/{{(\w+)}}/ig,function (full,$1) {
                 if($1 === 'user')
                     return 'coco98';
                 if($1 === 'comment')
                     return comm;
               return article[$1];
            });
            console.log(result);
            res.send(result);
        }

    })
};
router.get('/',function (req,res) {
    req.query.page = req.query.page || 1;
    var offset = (req.query.page - 1)*10; // 10 article per list (max)
    db.article.findAll(10,offset,function (err,result) {
        if(err){
            //handle err
            res.sendFile(path.join(__dirname, '..', 'views', 'error.html'));
        }
        else{
            console.log(result);
            makeHtml(result.rows,result.rowCount,req,res);
        }
    })
});
router.get('/find/:ID',function (req,res) {
   db.article.findById(req.params.ID,function (err,result) {
       if(err) {
           res.sendFile(path.join(__dirname, '..', 'views', 'error.html'));
       }
       else{
           var article = result.rows[0];
           db.article.findComments(req.params.ID,function (err,comments) {
               if(err){
                   console.log(err);
               }
               makeArticle(article,comments.rows,req,res);
           })
       }
   });
});
router.post('/find/:ID',function (req,res) {
    req.body.created_by =  req.user.username;
    db.article.addComment(req.params.ID,req.body,function (err,result) {
        if(err){
            console.log(err);
            res.status(500).json({msg : err.message});
        }
        else{
            console.log(result);
            res.status(200).json({msg : 'ok'});
        }
    })

});
router.get('/:category',function(req,res){
    req.query.page = req.query.page || 1;
    var offset = (req.query.page - 1)*10;
    console.log(req.params.category,'fgnfggnfgn');
 db.article.findByCategory(req.params.category,10,offset,function(err,result){
     if(err){
         //handle err
         console.log(err);
         res.sendFile(path.join(__dirname, '..', 'views', 'error.html'));
     }
     else{
         console.log(result);
         makeHtml(result.rows,result.rowCount,req,res);
     }

 })
});

module.exports = router;