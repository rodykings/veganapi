var express = require('express');
const Product = require('../models/product');
const { json } = require('express');

var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const product = await Product.find()
    return res.status(200).json(product)  
  } catch (error) {
    return res.status(500).json({msg:"Error getting products!", error})
  }
});

router.post('/', async function(req, res, next) {
  try {
    const newProduct = await new Product({
        name:req.body.name,
        price:req.body.price,
        type:req.body.type,
        description:req.body.description,
        image:req.body.image
    });

    await newProduct.save()
    return res.status(201).json("New product sucessfully created!")  
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:"Error creating recipe", error})
  }
});


module.exports = router;