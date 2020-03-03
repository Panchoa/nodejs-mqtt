let mqtt = require('mqtt')

let client = mqtt.connect('mqtt://localhost:1883');

let n = 0;

client.on('connect', () => {
    setInterval(() => {
        client.publish('default', 'message: ' + n);
        console.log('Message ' + n + ' sent');
        n++;
    }, 2000);
});
