var mongoose = require('mongoose');
const Document = require('./document.js');

var Schema = mongoose.Schema;
var govSchema = new Schema({
    company_name : String,
    company_address : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    company_number : String,
    leader_name : String,
    leader_parentname: String,
    leader_surname : String,
    leader_email : String,
    bank_details : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank'
    }
});

var GovModel = mongoose.model('GovPerson', govSchema);
module.exports = GovModel;

