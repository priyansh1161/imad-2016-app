var Pool = require('pg').Pool;

var pool = new Pool({
    user : 'priyansh1161',
    database : 'priyansh1161',
    password : 'db-priyansh1161-66700',
    port : '5432',
    host : 'db.imad.hasura-app.io'
});

pool.query('SELECT * FROM "Users"',function (err,res,done) {
    if(err)
        console.log(err);
    console.log(res);
});
