var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.redirect('./auth/my/my.html'); //根目录为public
  res.redirect('./pages/auth/photo/photo.html')
});

module.exports = router;
