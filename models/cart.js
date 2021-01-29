const mongoose = require('mongoose');

const Cart = mongoose.model('Cart', new mongoose.Schema({
    items:{
        type:Map,
        required: true,
    },
    total:{
        type:Number,
        required: true
    }
}));

module.exports = Cart;