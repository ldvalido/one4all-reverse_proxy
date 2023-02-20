var amqp = require('amqplib/callback_api');

function publish(queueHost, queueName, message) {
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
}

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    amqpConn.close();
    return true;
}

function consume(queueHost, queueName, fnConsumer) {
    amqp.connect('amqp://' + queueHost, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queueName, { durable: false }, function(err, _ok) {
                    if (closeOnErr(err)) return;
                    // Consume incoming messages
                    channel.consume(queueName, processMsg, { noAck: false });
                    console.log("[AMQP] Worker is started");
                });
                function processMsg(msg) {
                    try {
                        var res = fnConsumer.call(this, msg)
                        res ? channel.ack(msg) : channel.reject(msg, true); 
                    }
                    catch (e) {
                        channel.reject(msg,true);
                    }
                }
            });
        })
    }


module.exports = {publish:publish, consume:consume}