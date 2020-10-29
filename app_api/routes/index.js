var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
var blogCtrl = require('../controllers/blogCtrl');
var authCtrl = require('../controllers/authentication');

// Set up endpoints
router.get('/blogs/', blogCtrl.get);
router.get('/blogs/:id', blogCtrl.getSingle);
router.post('/blogs/', auth, blogCtrl.add);
router.put('/blogs/:id', auth, blogCtrl.edit);
router.delete('/blogs/:id', auth, blogCtrl.delete);
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

module.exports = router;
