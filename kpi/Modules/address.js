var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var addressSchema = new Schema({
    person: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    country : String,
    region : String,
    locality : String,
    street : String,
    building : String
});

var AddressModel = mongoose.model('Address', addressSchema);
module.exports = AddressModel;

