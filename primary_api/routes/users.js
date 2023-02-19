var express = require('express');
var router = express.Router();
var amqp_helper = require('../../node-tools/amqp_helper.js')
var sync = process.env.IS_SYNC == 1;
var queue_hostName = process.env.QUEUE_SERVER_HOSTNAME
var queue_queueName = process.env.QUEUE_NAME

setTimeout(start, 10000);
function start(){

  console.log(sync);
  if (sync) {
    router.get('/', function(req, res, next) {
      console.log("Primary API")
      res.send('respond with a resource');
    });
  }else{
    console.log("listening");
    console.log("Queue Host: "  + queue_hostName) ;
    console.log("Queue Name: " + queue_queueName);
    amqp_helper.consume(queue_hostName, queue_queueName, (msg) => {
      console.log(msg);
    });
  }
}

module.exports = router;
