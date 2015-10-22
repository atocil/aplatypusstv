var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SpeakEZ' });
});

router.get('/donation', function(req, res, next) {
    res.render('donation', {title: 'SpeadEZ'});
});

module.exports = router;
