var mongoose = require('mongoose');
const Document = require('./document.js');

var Sсhema = mongoose.Schema;

var phSchema = new Sсhema({
    _id : mongoose.Schema.Types.ObjectId,
    name :{
        first_name : String,
        parent_name : String
    },
    surname : String,
    person_number : String,
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    email : String,
    bank_details : {
        card_number : Number,
        owner_name : String,
        owner_surname : String,
        cvc_code : Number,
        card_date : String
    },
    passport : {
        passport_number : Number,
        passport_series : String
    }
});

var PhModel = mongoose.model('phSchema', phSchema);
module.exports = PhModel;

