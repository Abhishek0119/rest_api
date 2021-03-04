const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const UserSchema = new mongoose.Schema({
    Name :{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Address:{
        type:String,
        required:true
    },
    Phone_number:{
         type:Number,
         required:true,
    },
    Password:{
        type:String,
        required:true
    }
})
UserSchema.pre('save', function (next) {
         const user = this;
         const encryptedString = cryptr.encrypt(user.Password);
         user.Password = encryptedString;
         next();
})
/*const encryptedString = cryptr.encrypt('bacon');
const decryptedString = cryptr.decrypt(encryptedString);
console.log( encryptedString);
console.log(decryptedString);*/
const User = mongoose.model('User',UserSchema);
module.exports = User;