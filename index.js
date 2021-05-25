const fastify = require('fastify')()


const redis = require("redis");
const client1 = redis.createClient();

client1.on("error", function (error) {
    console.error(error);
});

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


let point;

fastify.post('/', (req, reply) => {
  
    point = req.body;

    point = JSON.stringify(point);
       redisClient.rpush(['Silos', point], function (err, reply) {
        console.log("Queue Length", reply);
    });

});


fastify.listen(3000, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})
