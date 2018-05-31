var mongoose = require('mongoose');

var Sсhema = mongoose.Schema;
var mediaSchema = new Sсhema({
    founder: String,
    number: Number,
    register: String,
    date: Date,
    document: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    type: String,
    name: String,
});

var MediaModel = mongoose.model('Media', mediaSchema);
module.exports = MediaModel;

