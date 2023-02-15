var express = require('express');
var request = require('request');
var router = express.Router();

var primary_api_hostname = process.env.PRIMARY_API_HOSTNAME
var secondary_api_hostname = process.env.SECONDARY_API_HOSTNAME
/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log("Primary Api");
  request.get(`http://${primary_api_hostname}:3000/users/`);
  console.log("Secondary Api");
  request.get(`http://${secondary_api_hostname}:3000/users/`);
  res.send('respond with a resource');
});

module.exports = router;
