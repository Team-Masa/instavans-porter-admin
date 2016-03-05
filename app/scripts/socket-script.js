'use strict';
io.sails.url = 'http://localhost:1337';
// io.sails.connect();
// io.socket.get('http://localhost:1337/subscribe-to-jobs', data=> console.log(data));
// io.socket.on('jobs', function (msg) {
//   // ...
//   console.log('log:',msg);
// });
var socket = io.sails.connect();

typeof console !== 'undefined' &&
console.log('Connecting Socket.io to Sails.js...');

// Attach a listener which fires when a connection is established:
socket.on('connect', function socketConnected() {

  console.log(
    'Socket is now connected and globally accessible as `socket`.\n' +
    'e.g. to send a GET request to Sails via Socket.io, try: \n' +
    '`socket.get("/foo", function (response) { console.log(response); })`'
  );

  socket.get("http://localhost:1337/subscribe-to-jobs", function (response) { console.log(response); });

  socket.get('http://localhost:1337/jobs', {
    limit: 3
  }, function (response) {
    // Here's what the server responded with
    console.log(response);
  });

  // Attach a listener which fires every time the server publishes a message:
  socket.on('message', function newMessageFromSails ( message ) {

    typeof console !== 'undefined' &&
    console.log('New message received from Sails ::\n', message);

  });

  socket.on('jobs', function newMessageFromSails ( message ) {

    typeof console !== 'undefined' &&
    console.log('New message rjobseceived from Sails ::\n', message);

  });
});
