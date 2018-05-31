var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var docSchema = new Schema({
    register: String,
    id_founder : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    type: String,
    name: String,
    language: String,
    sphere: String,
    readers_category: String,
    aims: String,
    theme: String,
    period: String,
    paper_size: String,
    amount: Number,
    redaction_office: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address"
    },
    start_reg_date : Date,
    ready_reg_date : Date,
    status : {
        type: String,
        default: 'PROCESSED'
    },
    file : String
});

var DocModel = mongoose.model('Document', docSchema);
module.exports = DocModel;

