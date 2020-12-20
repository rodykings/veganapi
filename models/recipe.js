const mongoose = require('mongoose');

const Recipes = mongoose.model('Recipe', new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    ingredients:{
        type:Array,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
    
}));

module.exports = Recipes;