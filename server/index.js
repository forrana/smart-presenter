const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.use("/css",express.static(__dirname + '/css'))
app.use("/js",express.static(__dirname + '/js'))
app.use("/img",express.static(__dirname + '/img'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const io = require('socket.io')(server, {
  path: '/socket.io',
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

const adminMap = new Map()

// io.set('origins', 'http://localhost:8080, http://192.168.10.33:8080');

console.log("listening on port 3001")

const isClientAdminForChannel = (socket, namespace) => {
  return namespace.adminSessionId == socket.client.id
}

const dynamicNsp = io.of(/^\/socket\.io\/dynamic-[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
dynamicNsp.on('connect', (socket) => {
  console.log("connected", socket.client.id);
  const newNamespace = socket.nsp;
  newNamespace.adminSessionId = !newNamespace.adminSessionId ?
    socket.client.id : newNamespace.adminSessionId;

  socket.on('register_user', message => {
    if(newNamespace.adminSessionId == socket.client.id) {
      console.log("user is registered");
      newNamespace.adminClientId = message.userId;
    } else if(newNamespace.adminClientId == message.userId) {
      console.log("session is updated");
      const openSockets = newNamespace.clients().sockets;
      const fullSessionIdName = `${newNamespace.name}#${newNamespace.adminSessionId}`;
      if(openSockets[fullSessionIdName]) {
        console.log("user is deregistered");
        openSockets[fullSessionIdName].emit("user_deregistered", { data: true });
      }
      // io.to(`${newNamespace.adminSessionId}`).emit("user_registered", { data: "" });
      newNamespace.adminSessionId = socket.client.id;
    } else return;
    socket.emit("user_registered", { data: message.userId });
  });

  socket.on('state_changed', (message) => {
    console.log("state change attempt", message);
    isClientAdminForChannel(socket, newNamespace) &&
      newNamespace.emit("state_changed", { data: message.data });
  });
});

server.listen(3001);
