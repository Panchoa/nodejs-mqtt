const TOPIC       = 'iot/water';
const SECURE_KEY  = __dirname + '/ca/server.key';
const SECURE_CERT = __dirname + '/ca/server.crt';
const PUBLISHER_USERNAME = process.argv[2].split(':')[0]
const PUBLISHER_PASSWORD = process.argv[2].split(':')[1]
const SUBSCRIBER_USERNAME = process.argv[3].split(':')[0]
const SUBSCRIBER_PASSWORD = process.argv[3].split(':')[1]
 
const settings = {
  secure : {
    port: 8443,
    keyPath: SECURE_KEY,
    certPath: SECURE_CERT,
  }
};

let mosca = require('mosca');
let server = new mosca.Server(settings);

let authenticate = function(client, username, password, callback) {
  let authorized = (
    (username === PUBLISHER_USERNAME && password.toString() === PUBLISHER_PASSWORD) || 
    (username === SUBSCRIBER_USERNAME && password.toString() === SUBSCRIBER_PASSWORD)
  );
  if (authorized) client.user = username;
  callback(null, authorized);
}

let authorizePublish = function(client, topic, payload, callback) {
  auth = topic == TOPIC && client.user == PUBLISHER_USERNAME;
  callback(null, auth);
}

let authorizeSubscribe = function(client, topic, callback) {
  auth = topic == TOPIC && client.user == SUBSCRIBER_USERNAME;
  callback(null, auth);
}

server.on('ready', () => {
  console.log('Broker is listening');
  server.authenticate = authenticate;
  server.authorizePublish = authorizePublish;
  server.authorizeSubscribe = authorizeSubscribe;
});
