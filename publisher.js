let TOPIC = 'iot/water'
let PORT = process.argv[2]
let USERNAME = process.argv[3]
let PASSWORD = process.argv[4]

let mqtt = require('mqtt')

let client = mqtt.connect('mqtts://localhost:' + PORT, {
    username: USERNAME,
    password: PASSWORD
});

let n = 0;

client.on('connect', () => {
    setInterval(() => {
        response = client.publish(TOPIC, 'message: ' + n);
        console.log(TOPIC + ': Message ' + n + ' sent');
        n++;
    }, 2000);
});
