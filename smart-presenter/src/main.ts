import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from 'socket.io-client';
let VueSocketIO = require('vue-socket.io')

// Vue.config.productionTip = false;

interface WSMessage {
  data: String
}

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'ws://192.168.10.33:3001/dynamic-101',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    // options: { path: "/dynamic-101/" }
}))

new Vue({
  //@ts-ignore
  sockets: {
    connect: function () {
      console.log('socket connected');
      //@ts-ignore
      this.$socket.emit("state_changed", { data: this.$route.name });
    },
    state_changed: function(message: WSMessage) {
      //@ts-ignore
      if(this.$route.fullPath !== message.data)
      //@ts-ignore
        router.push({ path: message.data })
    }
  },
  watch: {
    $route(to, from) {
      //@ts-ignore
      this.$socket.emit("state_changed", { data: to.fullPath });
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// const socket = io('ws://localhost:3001/dynamic-101');
// console.log("socket is connected", socket)
//
// socket.on('connect', function(){
//   console.log("Connected");
//   socket.emit("state_changed", { state: "data" }, function(data: { my: String }){console.log(data)});
// });
//
// socket.on('state_changed', function(data: { message: String }){
//   console.log("Recieved data", data);
//   socket.emit("state_changed", { my: "data" }, (data: { my: String }) => console.log(data));
// });
//
// socket.on('disconnect', function(){
//   console.log("Disconnected");
// });
