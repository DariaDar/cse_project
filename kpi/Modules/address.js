var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var addressSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    country : String,
    region : String,
    locality : String,
    street : String,
    building : String
});

var AddressModel = mongoose.model('addressSchema', addressSchema);
module.exports = AddressModel;

