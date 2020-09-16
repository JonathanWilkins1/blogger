var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/homeCtrl');
var blogCtrl = require('../controllers/blogCtrl');

/* GET home page. */
router.get('/', homeCtrl.home);
/* GET blog list page. */
router.get('/blog', blogCtrl.list);
/* GET blog add page. */
router.get('/blog/add', blogCtrl.add);
/* GET blog edit page. */
router.get('/blog/edit', blogCtrl.edit);
/* GET blog delete page. */
router.get('/blog/delete', blogCtrl.delete);

module.exports = router;
