var mongoose = require('mongoose');

var Sсhema = mongoose.Schema;
var mediaSchema = new Sсhema({
    _id : mongoose.Schema.Types.ObjectId,
    type : String,
    title : String,
    language : String,
    sphere : String,
    goals : String,
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'address'
    }
});

var MediaModel = mongoose.model('mediaSchema', mediaSchema);
module.exports = MediaModel;

