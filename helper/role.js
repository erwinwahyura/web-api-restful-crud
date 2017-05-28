require('dotenv').config()
var jwt = require('jsonwebtoken')
var secret = process.env.SECRET
var admins = 'admin';
// var auth = ''
function admin(req, res, next) {
  let token = req.headers.token
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (decoded.role == admins.toLowerCase()) {
        next()
      } else {
        res.send('you cant access thiss page!')
      }
    })
  } else {
    res.send('Please Login First!')
  }
}


function auth(req, res, next) {
  let token = req.headers.token
  if(token) {
    jwt.verify(token, secret, function(err, decoded) {
      if(decoded.role == admins.toLowerCase() || decoded.id == req.params.id) {
        next()
      } else {
        res.send('Sorry This page cant be access!')
      }
    })
  } else {
    res.send('Login Please!')
  }
}

module.exports = {
  admin,
  auth
}