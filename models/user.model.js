var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    displayName : String,
    img : String,
    email : String,
    google : {
        id : String,
        token : String
    },
     twitter : {
        id : String,
        token : String
    },
     facebook : {
        id : String,
        token : String
    }
});

module.exports = mongoose.model('user',userSchema);