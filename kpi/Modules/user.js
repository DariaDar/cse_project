var mongoose = require('mongoose');
var crypto = require('crypto');


var Sсhema = mongoose.Schema;
var userSchema = new Sсhema({
    login : String,
    password : String,
    type :{
        type : String,
        enum : ['gov', 'physical']
    },
    id_person: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'GovPerson' || 'Person'
    }
});


var salt = 'OFH725%okdIn&';


function hash(str, key) {
    return crypto.createHmac('sha1', key)
        .update(new Buffer(str, 'utf-8'))
        .digest('hex');
}

userSchema.methods.checkUsername = function(username){
    return this.login === username;
}

userSchema.virtual('password_temp')
    .set(function(password){
        this._plainPassword = password;
        this.password = hash(password, salt);
    })
    .get(function(){
        return this._plainPassword;
    });

userSchema.methods.checkPassword = function(password){
    return this.password === hash(password, salt);
}

var UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;

