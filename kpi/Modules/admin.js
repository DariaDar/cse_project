var mongoose = require('mongoose');

var Sсhema = mongoose.Schema;
var adminSchema = new Sсhema({
    _id : mongoose.Schema.Types.ObjectId,
    name :{
        first_name : String,
        parent_name : String
    },
    surname : String,
    email : String
});

var AdminModel = mongoose.model('adminSchema', adminSchema);
module.exports = AdminModel;

