let mosca = require('mosca');
 
let TOPIC = 'iot/water';
var SECURE_KEY = __dirname + '/ca/server.key';
var SECURE_CERT = __dirname + '/ca/server.crt';

let settings = {
  port: 1883,
  secure : {
    port: 8443,
    keyPath: SECURE_KEY,
    certPath: SECURE_CERT,
  }
};
 
let server = new mosca.Server(settings);

let authenticate = function(client, username, password, callback) {
  let authorized = (
    (username === 'alice' && password.toString() === 'azerty') || 
    (username === 'bob' && password.toString() === 'qwerty')
  );
  if (authorized) client.user = username;
  callback(null, authorized);
}

let authorizePublish = function(client, topic, payload, callback) {
  auth = topic == TOPIC && client.user == 'alice';
  callback(null, auth);
}

let authorizeSubscribe = function(client, topic, callback) {
  auth = topic == TOPIC && client.user == 'bob';
  callback(null, auth);
}

server.on('ready', () => {
  console.log('Broker is listening');
  server.authenticate = authenticate;
  server.authorizePublish = authorizePublish;
  server.authorizeSubscribe = authorizeSubscribe;
});
