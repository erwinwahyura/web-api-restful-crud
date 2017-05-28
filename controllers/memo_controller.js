var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const memo_model = require('../models/memo.js')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var methods = {}
//cara 1, save is more faster than .create
methods.add_memo = function(req, res, next){
    var memo = new memo_model({
      title:req.body.title,
      text:req.body.text,
      author : req.body.author
    })
    memo.save(function(err,result){
      if(!err) res.send(result)
      else res.send(err.message)
    })
}
//cara 2
methods.add_memo2 = function(req, res, next) {
  let query = {title:req.body.title, text:req.body.text, author:req.body.author}
  memo_model.create(query, function(err, memo) {
    if(!err) res.send(memo)
    else res.send(err)
  })
}

methods.getAllMemo = function(req, res, next) {
  memo_model.find(function(err, memo) {
    if(!err) res.send(memo)
    else console.log(err);
  })
}
//method deleteOne can also use remove, deleteOne with promise .then / callback and deleteMany
methods.delete_memo = function(req, res, next) {
  memo_model.deleteOne({_id:req.params.id}, function(err, result) {
    if(!err) res.send("success deleted")
    else res.send(err)
  })
}

//trying using findOneandDelete
//docs : http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

methods.update_memo = function(req, res, next) {
  let id = req.params._id
  let query_update = {title: req.body.title, text: req.body.text, author: req.body.author}

  memo_model.findOneAndUpdate({_id:id}, {$set : {title: req.body.title, text: req.body.text, author: req.body.author}}, function(err, result) {
    if(!err) res.send("update successful\n"+ result)
    else res.send(err.message)
  })
}

module.exports = methods
