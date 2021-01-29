var express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product')
const { json } = require('express');

var router = express.Router();


router.get('/', async function(req, res, next) {
  try {
    const cart = await Cart.findOne({
        _id:req.body.id
    })
    return res.status(200).json(cart)  
  } catch (error) {
    return res.status(500).json({msg:"Error getting cart!", error})
  }
});

router.post('/add', async function(req, res, next) {
    try {
      const cart = await Cart.findOne({
          _id:req.body.id
      })

      const product = await Product.findOne({
          _id:req.body.item
      })


      /*
      if(product)
      {
        return res.status(400).json({msg:"Product does not exist!"})
      }*/
      
      cart.items.set(req.body.item, req.body.qty);
      cart.save();

      return res.status(200).json(cart)  
    } catch (error) {
      return res.status(500).json({msg:"Error getting cart!", error})
    }
  });


router.post('/', async function(req, res, next) {
  try {
    const newCart = await new Cart({
        items:new Map(),
        total: 0
    });

    await newCart.save()
    return res.status(201).json({msg:"New cart sucessfully created!", cart_id:newCart.id})  
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:"Error creating cart", error})
  }
});


module.exports = router;