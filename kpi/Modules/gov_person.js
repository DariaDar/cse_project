var mongoose = require('mongoose');
const Document = require('./document.js');

var Schema = mongoose.Schema;
var govSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    company_name : String,
    company_address : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    company_number : String,
    leader_name :{
        name : String,
        parent_name : String
    },
    leader_surname : String,
    leader_email : String,
    bank_details : {
       card_number : Number,
       owner_name : String,
       owner_surname : String,
       cvc_code : Number,
       card_date : String
    }
});

var GovModel = mongoose.model('govSchema', govSchema);
module.exports = GovModel;

