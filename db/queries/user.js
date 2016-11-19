var crypto = require('crypto');
var setPassword = function (password,cb) {
    var salt = crypto.randomBytes(32).toString('hex');
    crypto.pbkdf2(password,salt,1000,64,'sha256',function (err,key) {
        if(err) throw err;
        else {
            var hash = key.toString('hex');
            cb(salt,hash);
        }
    });
};
var validatePassword = function (password,salt,hash) {
    return crypto.pbkdf2Sync(password,salt,1000,64,'sha256').toString('hex') == hash;
};
module.exports = function (pool) {
  return {
      findAll: function (cb) {
          pool.query('SELECT * FROM "users"', cb);
      },
      findById: function (id, cb) {
          pool.query(`SELECT * FROM "users" WHERE "ID"=$1`, [id], cb);
      },
      createUser : function (obj,cb) {
          setPassword(obj.password,function (salt,hash) {
              pool.query(`INSERT INTO "users" (username,name,email,salt,hash) VALUES ($1,$2,$3,$4,$5)`,[obj.username,obj.name,obj.email,salt,hash],cb)
          });
      },
      findByUserName : function (username,cb) {
          pool.query(`SELECT * FROM "users" WHERE username=$1`,[username],cb);
      },
      validatePassword : validatePassword,
      validateUser : function (userName,password,ID,cb) {
          //provide only one userName or id;
          var query = `SELECT hash, salt FROM "users" WHERE `;
          if(!ID)
              query = `${query} userName = $1`;
          else
              query = `${query} ID = $1`;
          var key = userName || ID;
          pool.query(query,[key],function (err,result) {
             if(err)
                 return cb(err);
             if(result || result.rows[0])
                 var validated = validatePassword(password,result.rows[0].salt,result.rows[0].hash);
                cb(null,validated);
          });
      }
  }

};