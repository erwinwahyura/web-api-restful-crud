var express = require('express')
var router = express.Router()
var memo_controller = require('../controllers/memo_controller')
var user_controller = require('../controllers/user_controller')
var role = require('../helpers/role')

router.get('/', function(req, res) {
  res.send('now im alive')
})
//memo
router.post('/api/memos', role.auth, memo_controller.add_memo);
router.post('/api/memos2', role.auth, memo_controller.add_memo2);
router.get('/api/memos', role.auth, memo_controller.getAllMemo);
router.delete('/api/memos/:id', role.admin, memo_controller.delete_memo);
router.put('/api/memos/:_id', role.auth, memo_controller.update_memo);


//user
router.post('/api/signup', user_controller.signUp);
router.post('/api/signin', user_controller.signIn);
router.post('/api/logout', role.auth, user_controller.logOut);
// router.get('/api/users', user_controller.getAllUser);
// router.delete('/api/users/:id', user_controller.delete_user);
// router.put('/api/users/:_id', user_controller.update_user);

module.exports = router