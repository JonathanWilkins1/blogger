var express = require('express');
var router = express.Router();
var blogCtrl = require('../controllers/blogCtrl');

router.get('/blogs/', blogCtrl.get);
router.get('/blogs/:id', blogCtrl.getSingle);
router.post('/blogs/', blogCtrl.add);
router.put('/blogs/:id', blogCtrl.edit);
router.delete('/blogs/:id', blogCtrl.delete);

module.exports = router;