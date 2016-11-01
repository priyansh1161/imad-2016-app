var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    question: String,
    createdBy: {
        id: Schema.ObjectId,
        name: String
    }, // id of user who asked the question.
    createdOn: {
        type: Date,
        default: Date.now
    },
    options: [{ field : String , value : Number }] // this will contain options for Question.
});
module.exports = mongoose.model('question', questionSchema);