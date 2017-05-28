var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.send('now im alive')
})

module.exports = router