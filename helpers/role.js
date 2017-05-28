require('dotenv').config()
var jwt = require('jsonwebtoken')
var secret = process.env.SECRET

// var auth = ''
function admin(req, res, next) {
  var admin = 'admin';
  let token = req.headers.token
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (decoded.role == admin.toLowerCase()) {
        next()
      } else {
        res.send('you cant access thiss page!')
      }
    })
  } else if(!token){
    res.send('Welcome To Memos, Login To write some memos Thanks!')
  } else {
    res.send('login please!')
  }
}


function auth(req, res, next) {
  var admin = 'admin';
  let token = req.headers.token
  if(token) {
    jwt.verify(token, secret, function(err, decoded) {
      if(decoded.role == admin.toLowerCase() || decoded.id == req.params.id) {
        next()
      } else {
        res.send('Sorry This page cant be access!')
      }
    })
  } else if(!token){
    res.send('Welcome To Memos, Login To write some memos Thanks!')
  } else {
    res.send('login please!')
  }
}

module.exports = {
  admin,
  auth
}