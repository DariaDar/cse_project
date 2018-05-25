var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var docSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id_register : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "id_register"
    },
    id_founder : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "id_founder"
    },
    id_media : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "id_media"
    },
    start_reg_date : Date,
    ready_reg_date : Date,
    status : {
        type: String,
        enum: ['IN_PROC', 'DELETE', 'SUCCESS'],
        enum: 'IN_PROC'
    },
    doc_info : {
        document_number : Number,
        document_series : String
    },
    file : String
});

var DocModel = mongoose.model('docSchema', docSchema);
module.exports = DocModel;

