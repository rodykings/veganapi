var express = require('express');
const { json } = require('express');

var router = express.Router();

router.get('/:name', function (req, res, next) {
    var options = {
      root: path.join('assets', 'public'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
  
    var fileName = req.params.name
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err)
      } else {
        console.log('Sent:', fileName)
      }
    })
  })

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