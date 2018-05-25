var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var regSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    email : String,
    type : String
});

var RegModel = mongoose.model('regSchema', regSchema);
module.exports = RegModel;

