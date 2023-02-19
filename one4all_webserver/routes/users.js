var express = require('express');
var request = require('request');
var nodetools = require('node-tools')
var router = express.Router();

var primary_api_hostname = process.env.PRIMARY_API_HOSTNAME
var secondary_api_hostname = process.env.SECONDARY_API_HOSTNAME
var sync = process.env.IS_SYNC == 1;
var queueName = process.env.QUEUE_NAME || "webserver_queue";
/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    if (sync) {
      console.log("Primary Api");
      request.get(`http://${primary_api_hostname}:3000/users/`);
      console.log("Secondary Api");
      request.get(`http://${secondary_api_hostname}:3000/users/`);
    }else{
      console.log(nodetools)
      for (t in nodetools) {
        console.log(t)
      }
      nodetools.publish(process.env.QUEUE_SERVER_HOSTNAME,queueName,'exec');
    }

    res.send('respond with a resource'); 
  } catch (error) {
    next(error);
  }
});

module.exports = router;
