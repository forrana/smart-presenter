import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from 'socket.io-client';
let VueSocketIO = require('vue-socket.io')


// Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'ws://localhost:3001/dynamic-101',
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
      this.$socket.emit("state_changed", { state: this.$route.name });
    },
    hello: function (data: {message: String}) {
      console.log("Hello from server", data)
    }
  },
  watch: {
    $route (to, from){
      this.$socket.emit("state_changed", { state: to.name });
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
