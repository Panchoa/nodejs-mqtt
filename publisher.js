let TOPIC = 'iot/water'
let mqtt = require('mqtt')

let client = mqtt.connect('mqtt://localhost:1883', {
    username: process.argv[2],
    password: process.argv[3]
});

let n = 0;

client.on('connect', () => {
    setInterval(() => {
        response = client.publish(TOPIC, 'message: ' + n);
        console.log(TOPIC + ': Message ' + n + ' sent');
        n++;
    }, 2000);
});
