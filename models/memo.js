var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memoSchema = new Schema({
  title:  {
    type : String,
    required : true,
    unique : true
  },
  text: {
    type : String,
    required : true
  },
  author: {
    type : String,
    required : true
  }
});

var memo = mongoose.model('Memo', memoSchema);

module.exports = memo