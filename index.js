const fastify = require('fastify')()
const { InfluxDB } = require('@influxdata/influxdb-client')


const client = new InfluxDB({ url: 'http://localhost:8086', token: token })

const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
});

const redis = require("redis");
let redisNotReady = true;
let redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});
redisClient.on("error", (err) => {
   console.log("error", err)
});
redisClient.on("connect", (err) => {
    console.log("connect");
});
redisClient.on("ready", (err) => {
    redisNotReady = false;
    console.log("ready");
});


let temperaturas1;
let temperaturas2;
let temperaturas3
let temperaturas4;
let temperaturas5;
let temperaturas6;
let temperaturaS7;

let silos;
let data;
let point;

fastify.post('/', (req, reply) => {

    let silos1 = 0;
    let silos2 = 0;
    let silos3 = 0;
    let silos4 = 0;
    let silos5 = 0;
    let silos6 = 0;
    let silos7 = 0;
    data = req.body;

    temperaturas1 = (data.values[49].v) / 1000;
    temperaturas2 = (data.values[50].v) / 1000;
    temperaturas3 = (data.values[51].v) / 1000;
    temperaturas4 = (data.values[52].v) / 1000;
    temperaturas5 = (data.values[53].v) / 1000;
    temperaturas6 = (data.values[54].v) / 1000;
    temperaturas7 = (data.values[55].v) / 1000;

    for (let i = 0; i < 49; i = i + 7) {
        if (i == 0) {
            for (let k = 0; k < 7; k++) {
                if (req.body.values[i + k].v) {
                    silos1++;
                }
            }
        }

        if (i == 7) {
            for (let k = 0; k < 7; k++) {
                if (req.body.values[i + k].v) {
                    silos2++;
                }
            }
        }

        if (i == 14) {
            for (let k = 0; k < 7; k++) {
                if (req.body.values[i + k].v) {
                    silos3++;
                }
            }
        }

        if (i == 21) {
            for (let k = 0; k < 7; k++) {
                if (req.body.values[i + k].v) {
                    silos4++;
                }
            }
        }

        if (i == 28) {
            for (let k = 0; k < 7; k++) {
                if (req.body.values[i + k].v) {
                    silos5++;
                }
            }
        }

        if (i == 35) {
            for (let k = 0; k < 7; k++) {
                if (req.body.values[i + k].v) {
                    silos6++;
                }
            }
        }

        if (i == 42) {
            for (let k = 0; k < 7; k++) {
                if (req.body.values[i + k].v) {
                    silos7++;
                }
            }
        }
    }

    redisClient.rpush(['Silos1', silos1], function (err, reply) {
        console.log("Queue Length", reply);
    });
    redisClient.rpush(['Temperaturas1', temperaturas1], function (err, reply) {
        console.log("Queue Length", reply);
    });

    redisClient.rpush(['Silos2', silos2], function (err, reply) {
        console.log("Queue Length", reply);
    });
    redisClient.rpush(['Temperaturas2', temperaturas2], function (err, reply) {
        console.log("Queue Length", reply);
    });

    redisClient.rpush(['Silos3', silos3], function (err, reply) {
        console.log("Queue Length", reply);
    });
    redisClient.rpush(['Temperaturas3', temperaturas3], function (err, reply) {
        console.log("Queue Length", reply);
    });

    redisClient.rpush(['Silos4', silos4], function (err, reply) {
        console.log("Queue Length", reply);
    });
    redisClient.rpush(['Temperaturas4', temperaturas4], function (err, reply) {
        console.log("Queue Length", reply);
    });

    redisClient.rpush(['Silos5', silos5], function (err, reply) {
        console.log("Queue Length", reply);
    });
    redisClient.rpush(['Temperaturas5', temperaturas5], function (err, reply) {
        console.log("Queue Length", reply);
    });

    redisClient.rpush(['Silos6', silos6], function (err, reply) {
        console.log("Queue Length", reply);
    });
    redisClient.rpush(['Temperaturas6', temperaturas6], function (err, reply) {
        console.log("Queue Length", reply);
    });

    redisClient.rpush(['Silos7', silos7], function (err, reply) {
        console.log("Queue Length", reply);
    });
    redisClient.rpush(['Temperaturas7', temperaturas7], function (err, reply) {
        console.log("Queue Length", reply);
    });

});


fastify.listen(3000, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})