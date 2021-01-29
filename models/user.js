const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: false
    },
    address:{
        type:String,
        required: false
    },
    contact:{
        type:Number,
        required: true
    },
    cart_id:{
        type:String,
        required: true
    }
}));

module.exports = User;