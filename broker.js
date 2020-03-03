let mosca = require('mosca');
 
let settings = {
  port: 1883
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
  auth = topic == 'iot/water' && client.user == 'alice';
  callback(null, auth);
}

let authorizeSubscribe = function(client, topic, callback) {
  auth = topic == 'iot/water' && client.user == 'bob';
  callback(null, auth);
}

server.on('ready', () => {
  console.log('Broker is listening');
  server.authenticate = authenticate;
  server.authorizePublish = authorizePublish;
  server.authorizeSubscribe = authorizeSubscribe;
});
