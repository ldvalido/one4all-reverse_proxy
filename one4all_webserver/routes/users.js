var express = require('express');
var request = require('request');
var amqp_helper = require('../infraestructure/amqp_helper.js')
var router = express.Router();

var primary_api_hostname = process.env.PRIMARY_API_HOSTNAME
var secondary_api_hostname = process.env.SECONDARY_API_HOSTNAME
var sync = process.env.IS_SYNC == 1;
var queueName = process.env.QUEUE_NAME || "webserver_queue";
/* GET users listing. */
router.get('/', function(req, res, next) {

  if (sync) {
      console.log("Primary Api");
      request.get(`http://${primary_api_hostname}:3000/users/`);
      console.log("Secondary Api");
      request.get(`http://${secondary_api_hostname}:3000/users/`);
  }else{
      amqp_helper.publish(process.env.QUEUE_SERVER_HOSTNAME,queueName,'exec');
  }
  
  res.send('respond with a resource');
});

module.exports = router;
