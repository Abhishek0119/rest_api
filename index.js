const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const route = require('./routes')
const {logger} = require('./logger');

const app = express();
mongoose.connect('mongodb://localhost/REST_API',{ 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/',route);
app.listen(4000,()=>{
    console.log("app is listening on the port 4000");
})