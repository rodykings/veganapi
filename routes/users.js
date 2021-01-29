var express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();

/* GET users listing. */
router.post('/', async function(req, res, next) {
  try {
    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      name: req.body.name,
      address: req.body.address,
      cart_id:req.body.cart_id
    })
    await newUser.save()
    return res.status(201).json("New user sucessfully created!")
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:"Error creating user", error})
  }
});

router.get('/me', async function(req, res, next) {
  try {
    
    let info = jwt.decode(req.headers.authorization.split(' ')[1])

    const user = await User.findById(info.user);
    //await newUser.save()
    return res.status(201).json({
      "name":user.name,
      "email":user.email,
      "contact":user.contact,
      "address":user.address
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:"Error creating user", error})
  }
});

/* GET users listing. */
router.post('/authenticator', async function(req, res, next) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })
    if(!user || !bcrypt.compareSync(req.body.password, user.password))
    {
      return res.status(400).json({msg:"Unable to authenticate the user!"})
    }
    const token = jwt.sign({
      user: user._id,
      cart: user.cart_id,
    }, 'TOP_SECRET');


    return res.status(200).json({
      msg:"User successfully authenticated",
      token:token,
      username: user.username,
      sucess: true
    })  
  } catch (error) {
    console.log(error)
    return res.status(500).json({sucess: false, msg:"Error authenticating user", error})
  }
});

module.exports = router;
