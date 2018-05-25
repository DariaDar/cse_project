var mongoose = require('mongoose');

var Sсhema = mongoose.Schema;
var logSchema = new Sсhema({
    _id : mongoose.Schema.Types.ObjectId,
    changing_date : Date,
    changing_type : {
        type: String,
        enum : ['DEL', 'ADD', 'MODIFY'],
        default : 'MODIFY'
    },
    entity_type : {
        type: String,
        enum : ['DOC', 'USER'],
        default : 'DOC'
    },
    comment : String,
    id_entity : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'id_entity'
    },
    id_user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'id_user'
    }
});

var LogModel = mongoose.model('logSchema', logSchema);
module.exports = LogModel;

