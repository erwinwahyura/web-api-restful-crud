var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restful-mongoDB')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error : '));
db.once('open', function() {
  //connected!
  console.log('connection success!');
})

var index = require('./routes/index')

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index)

app.listen(3000)

module.exports = app