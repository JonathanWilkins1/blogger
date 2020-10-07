var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/homeCtrl');
var blogCtrl = require('../controllers/blogCtrl');

router.get('/', homeCtrl.home);
router.get('/blog', blogCtrl.list);
router.get('/blog/add/', blogCtrl.addPage);
router.post('/blog/add/', blogCtrl.add)
router.get('/blog/edit/:id', blogCtrl.editPage);
router.post('/blog/edit/:id', blogCtrl.edit);
router.get('/blog/delete/:id', blogCtrl.deletePage);
router.post('/blog/delete/:id', blogCtrl.delete);

module.exports = router;
