var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const user_model = require('../models/user.js')
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

var methods = {}
//cara 1, save is more faster than .create
methods.s = function(req,res){
    var hash = bcrypt.hashSync(req.body.password, salt);
    console.log('hasnyanyaaaa ',hash);
    var user = new user_model({
      username: req.body.username,
      password: hash,
      email: req.body.email
    })
    user.save(function(err,result){
        console.log('usernya', user);

      if(!err) res.send('success \n'+result)
      else res.send(err.message)
    })
}
//cara 2
// methods.add_memo2 = function(req, res) {
//   let query = {title:req.body.title, text:req.body.text, author:req.body.author}
//   memo_model.create(query, function(err, memo) {
//     if(!err) res.send(memo)
//     else res.send(err)
//   })
// }
//
// methods.getAllMemo = function(req, res) {
//   memo_model.find(function(err, memo) {
//     if(!err) res.send(memo)
//     else console.log(err);
//   })
// }
// //method deleteOne can also use remove, deleteOne with promise .then / callback and deleteMany
// methods.delete_memo = function(req, res) {
//   memo_model.deleteOne({_id:req.params.id}, function(err, result) {
//     if(!err) res.send("success deleted")
//     else res.send(err)
//   })
// }
//
// //trying using findOneandDelete
// //docs : http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
//
// methods.update_memo = function(req, res) {
//   let id = req.params._id
//   let query_update = {title: req.body.title, text: req.body.text, author: req.body.author}
//
//   memo_model.findOneAndUpdate({_id:id}, {$set : {query_update}}, function(err, result) {
//     if(!err) res.send("update successful\n"+ result)
//     else res.send(err.message)
//   })
// }

module.exports = methods
