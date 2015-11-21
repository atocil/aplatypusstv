var express = require('express');
var router = express.Router();
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('aplatypuss.properties');
var mongo_client = require('../mongodb').client;
var mongo_url = require('../mongodb').url;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SpeakEZ' });
});

module.exports = router;