var express = require('express');
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();

/* GET users listing. */
router.post('/', async function(req, res, next) {
  try {
    const newUser = new Users({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      emoji: req.body.emoji,
    })
    await newUser.save()
    return res.status(201).json("New sucessfully created!")
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:"Error creating user", error})
  }
});

/* GET users listing. */
router.post('/authenticator', async function(req, res, next) {
  try {
    const user = await Users.findOne({
      username: req.body.username,
    })
    if(!user || !bcrypt.compareSync(req.body.password, user.password))
    {
      return res.status(400).json({msg:"Unable to authenticate the user!"})
    }
    const token = jwt.sign({
      username: user.username,
    }, 'TOP_SECRET');

    return res.status(200).json({
      msg:"User successfully authenticated",
      token:token,
      username: user.username
    })  
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:"Error authenticating user", error})
  }
});

module.exports = router;
