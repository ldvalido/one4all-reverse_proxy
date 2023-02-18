var amqp = require('amqplib/callback_api');

amqp_helper = {
    publish(queueHost, queueName, message) {
        amqp.connect('amqp://' + queueHost, function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
    
                channel.assertQueue(queueName, {
                    durable: false
                });
    
                channel.sendToQueue(queueName, Buffer.from(message));
                console.log(" [x] Sent %s", message);
            });
        });
    },
    consume(queueHost, queueName, fnCallback) {
        amqp.connect('amqp://' + queueHost, function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
    
                channel.assertQueue(queueName, {
                    durable: false
                }, (err, ok) => {
                    if (!err){
                        fnCallback.call()
                    }
                });

            });
        });
    }
}


module.exports = amqp_helper;