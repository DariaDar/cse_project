var mongoose = require('mongoose');
const Document = require('./document.js');

var Sсhema = mongoose.Schema;

var phSchema = new Sсhema({
    first_name : String,
    parent_name : String,
    surname : String,
    person_number : String,
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    email : String,
    bank_details : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank'
    },
    passport_number : Number,
    passport_series : String
});

var PhModel = mongoose.model('Person', phSchema);
module.exports = PhModel;

