var mongoose = require('mongoose');
const Document = require('./document.js');

var Sсhema = mongoose.Schema;
var userSchema = new Sсhema({
    _id : mongoose.Schema.Types.ObjectId,
    login : String,
    password : String,
    type :{
        type : String,
        enum : ['ADMIN', 'REGISTER', 'GOV_PERSON', 'PH_PRSON']
    },
    id_person:[ {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'id_person'
    }]
});

var UserModel = mongoose.model('userSchema', userSchema);
module.exports = UserModel;

