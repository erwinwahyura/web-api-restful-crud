var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const user_model = require('../models/user.js')
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var jwt = require('jsonwebtoken');
require('dotenv').config()

var methods = {}
//cara 1, save is more faster than .create
methods.signUp = function(req, res){

    var hash = bcrypt.hashSync(req.body.password, salt);
    console.log('hasnyanyaaaa ',hash);
    var user = new user_model({
      username: req.body.username,
      password: hash,
      email: req.body.email,
      role: req.body.role
    })
    user.save(function(err,result){
      console.log('usernya', user);
      if(!err) res.send('success \n'+result)
      else res.send(err.message)
    })
}

methods.signIn = function(req, res) {
  let username = req.body.username
  let password = req.body.password
  user_model.find({username: username, password: password}, function(err, result) {
    if (bcrypt.compare(req.body.password, result.password)) {
      var token = jwt.sign({username: result.username, email: result.email, role: result.role}, process.env.SECRET)
      res.send(token)
    } else {
      res.send('Silahkan Login terlebih dahhulu')
    }
  })
}

methods.logOut = function(req, res) {
  var token = req.headers.token
  if (token) {
    token = ''
    res.send('Terimakasih Telah menggunakan memos')
  }

}

module.exports = methods
