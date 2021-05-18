const fastify = require('fastify')()
const { InfluxDB } = require('@influxdata/influxdb-client')

const token = 'VSs4zsQwbDr_Wb0uAEnROay7eiSyBiy7BFhJapknChSVwehdl3WbIX84W7EoGS0fYMpKZBrbTSfBzfRqDoL2zA=='
const org = 'MSAF'
const bucket = 'Silos'

const client = new InfluxDB({ url: 'http://localhost:8086', token: token })



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

        const { Point } = require('@influxdata/influxdb-client')
        const writeApi = client.getWriteApi(org, bucket)
        writeApi.useDefaultTags({ host: 'host1' })
    
        point = new Point('silos').floatField('temperaturas1', temperaturas1);
        point.floatField('livellos1', silos1)
    
        point.floatField('temperaturas2', temperaturas2);
        point.floatField('livellos2', silos2)
    
        point.floatField('temperaturas3', temperaturas3);
        point.floatField('livellos3', silos3)
    
        point.floatField('temperaturas4', temperaturas4);
        point.floatField('livellos4', silos4)
    
        point.floatField('temperaturas5', temperaturas5);
        point.floatField('livellos5', silos5)
    
        point.floatField('temperaturas6', temperaturas6);
        point.floatField('livellos6', silos6)
    
        point.floatField('temperaturas7', temperaturas7);
        point.floatField('livellos7', silos7)
    
        writeApi.writePoint(point)
        writeApi
            .close()
            .then(() => {
                console.log('FINISHED')
            })
            .catch(e => {
                console.error(e)
                console.log('\\nFinished ERROR')
            })
});








/*
fastify.get('/test', (req, reply) => {
    const point = new Point('mem')
    .floatField('temperatura', temperaturas1)
    .floatField('livello', silos1)
    silos1 = 0;
writeApi.writePoint(point)
writeApi
    .close()
    .then(() => {
        console.log('FINISHED')
    })
    .catch(e => {
        console.error(e)
        console.log('\\nFinished ERROR')
    })
});*/




fastify.listen(3000, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})