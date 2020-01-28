const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.set('origins', 'http://localhost:8080, http://192.168.10.33:8080');

console.log("listening on port 3001")

const dynamicNsp = io.of(/^\/dynamic-\d+$/)
dynamicNsp.on('connect', (socket) => {
  const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
  console.log("client is connected:", socket.client.id);
  console.log("to namespace:", newNamespace.name);

  socket.on('state_changed', (message) => {
    console.log("state changed", message)
    newNamespace.emit("state_changed", { data: message.data })
  });
});

server.listen(3001);
