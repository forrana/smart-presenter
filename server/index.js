const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

const adminMap = new Map()

io.set('origins', 'http://localhost:8080, http://192.168.10.33:8080');

console.log("listening on port 3001")

const isClientAdminForChannel = (clientId, channelId) =>
  adminMap.get(channelId) === clientId

const dynamicNsp = io.of(/^\/dynamic-\d+$/)
dynamicNsp.on('connect', (socket) => {
  const newNamespace = socket.nsp;
  if(!adminMap.has(newNamespace.name)) {
    adminMap.set(newNamespace.name, socket.client.id);
  }
  socket.on('state_changed', (message) => {
    isClientAdminForChannel(socket.client.id, newNamespace.name) &&
      newNamespace.emit("state_changed", { data: message.data });
  });
});

server.listen(3001);
