var Pool = require('pg').Pool;
var config = {
    user : 'priyansh1161',
    database : 'priyansh1161',
    password : 'db-priyansh1161-66700',
    port : '5432',
    host : 'db.imad.hasura-app.io'
};
var pool = new Pool(config);

pool.query('SELECT * FROM "Users"',function (err,res,done) {
    if(err)
        console.log(err);
    console.log(res);
});
