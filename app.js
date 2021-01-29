var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var imagesRouter = require('./routes/images');
var cartRouter = require('./routes/cart');

const cors = require('cors')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/malteapi',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log('Connection ok!');
}).catch(()=>{
    console.log('Connection error!');
})


var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const verifyAccessToken = require('./routes/middleware/verifyAcessTokenMiddleware');

app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/images', imagesRouter);
/*app.use('/', verifyAccessToken, indexRouter);*/
app.use('/users', usersRouter);


module.exports = app;
