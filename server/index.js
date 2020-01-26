const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.set('origins', 'http://localhost:8080');

console.log("listening on port 3001")

//const dynamicNsp = io.of(/^\/dynamic-\d+$/).on('connect', (socket) => {
const dynamicNsp = io.of("dynamic-101")
dynamicNsp.on('connect', (socket) => {
  const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
  console.log("client is connected:", socket.client.id);
  console.log("to namespace:", newNamespace.name);
  // broadcast to all clients in the given sub-namespace
  // newNamespace.on('stateChange', (message) => {
  //   console.log("state changed", message)
  // });
  newNamespace.emit("hello", {message: "hello world"});

  socket.on('state_changed', (message) => {
    console.log("state changed", message)
  });
});

server.listen(3001);
