var express = require('express');
var path = require('path');
var logger = require('morgan');
global.reqlib = require('app-root-path').require;
const bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/transactions');
var app = express();
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/transactions', usersRouter);

module.exports = app;
