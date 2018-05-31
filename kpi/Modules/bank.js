var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bankSchema = new Schema({
    card_number : Number,
    owner_name : String,
    owner_surname : String,
    cvc_code : Number,
    date_month : Number,
    date_year: Number,
    person: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var bankModel = mongoose.model('Bank', bankSchema);
module.exports = bankModel;

