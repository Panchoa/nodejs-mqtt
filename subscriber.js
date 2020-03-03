let TOPIC = 'iot/water'
let PORT = process.argv[2]
let USERNAME = process.argv[3]
let PASSWORD = process.argv[4]

let mqtt = require('mqtt')

let client = mqtt.connect('mqtts://localhost:' + PORT, {
    username: USERNAME,
    password: PASSWORD
});

client.on('connect', () => {
    client.subscribe('iot/water');
});

client.on('message', (TOPIC, message) => {
    console.log(TOPIC + ': ' + message.toString());
})
