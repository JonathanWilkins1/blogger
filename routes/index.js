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

module.exports = router;
