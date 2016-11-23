var Pool = require('pg').Pool;
var config = {
    user : 'priyansh',
    database : 'priyansh',
    password : 'dewanschool',
    port : '5432',
    host : 'localhost'
};
//  config = {
//     user : 'priyansh1161',
//     database : 'priyansh1161',
//     port : '5432',
//     host : 'db.imad.hasura-app.io',
//     password : process.env.DB_PASSWORD
//
// };
var pool = new Pool(config);

var userQueries = require('./queries/user')(pool);
var articleQueries = require('./queries/articles')(pool);
// userQueries.findAll(function (err,result) {
//    console.log(err,result);
// });

// userQueries.findById(1,function (err,result) {
//     console.log(err,result);
// });
// userQueries.createUser({userName :'coco98', name : 'priyansh',email : 'priyanshgupta1161@gmail.com', password : 'hello' },function (err,result) {
//    console.log(err,result);
// });
// userQueries.validateUser('coco98','helklo',null,function (err,res) {
//     console.log(err,res);
// });
module.exports = {
  user : userQueries,
  article : articleQueries
};