var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memoSchema = new Schema({
  title:  String,
  author: String,
  status:   Boolean
});

var memo = mongoose.model('Memo', memoSchema);

module.exports = memo