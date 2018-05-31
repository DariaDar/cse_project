var mongoose = require('mongoose');

var Sсhema = mongoose.Schema;
var logSchema = new Sсhema({
    changing_date : Date,
    changing_type : {
        type: String,
        default : 'MODIFY'
    },
    entity_type : {
        type: String,
        default : 'DOC'
    },
    comment : String,
    id_entity : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Document' || 'User'
    },
    id_user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var LogModel = mongoose.model('Log', logSchema);
module.exports = LogModel;

