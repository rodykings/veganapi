const mongoose = require('mongoose');

const Product = mongoose.model('Product', new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:false
    }
    
}));

module.exports = Product;