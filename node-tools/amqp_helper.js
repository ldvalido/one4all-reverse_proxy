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

            channel.assertQueue(queueName, { durable: true }, function(err, _ok) {
                if (closeOnErr(err)) return;
                // Consume incoming messages
                channel.consume(queueName, fnConsumer, { noAck: false });
                console.log("[AMQP] Worker is started");
                });
            }
        )});
}


module.exports = {publish:publish, consume:consume}