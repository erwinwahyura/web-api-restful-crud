var express = require('express')
var router = express.Router()
var memo_controller = require('../controllers/memo_controller')

router.get('/', function(req, res) {
  res.send('now im alive')
})

router.post('/api/memos', memo_controller.add_memo);
router.post('/api/memos2', memo_controller.add_memo2);
router.get('/api/memos', memo_controller.getAllMemo);
router.delete('/api/memos/:id', memo_controller.delete_memo);
router.put('/api/memos/:_id', memo_controller.update_memo);


module.exports = router