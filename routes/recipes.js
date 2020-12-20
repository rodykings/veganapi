var express = require('express');
const Recipes = require('../models/recipe');
const { json } = require('express');

var router = express.Router();

router.get('/get_all', async function(req, res, next) {
  try {
    const recipes = await Recipes.find()
    return res.status(200).json(recipes)  
  } catch (error) {
    return res.status(500).json({msg:"Error getting recipes!", error})
  }
});

router.post('/send', async function(req, res, next) {
  try {
    const newRecipe = await new Recipes({
        title:req.body.title,
        ingredients:req.body.ingredients,
        description: req.body.description
    });

    await newRecipe.save()
    return res.status(201).json("New recipe sucessfully created!")  
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:"Error creating recipe", error})
  }
});


module.exports = router;