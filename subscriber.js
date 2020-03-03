let TOPIC = 'iot/water'
let mqtt = require('mqtt')

let client = mqtt.connect('mqtt://localhost:1883', {
    username: 'bob',
    password: 'qwerty'
});

client.on('connect', () => {
    client.subscribe('iot/water');
});

client.on('message', (TOPIC, message) => {
    console.log(TOPIC + ': ' + message.toString());
})
