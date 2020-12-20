var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recipesRouter = require('./routes/recipes');

const cors = require('cors')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/veganapi',{
    useNewUrlParser:true,
    useUnifiedTopology: true
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


app.use('/', verifyAccessToken, indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);

module.exports = app;
