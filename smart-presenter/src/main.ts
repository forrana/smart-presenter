import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from 'socket.io-client';
const VueSocketIO = require('vue-socket.io');


interface WSMessage {
  data: String
}

const sessionId = Math.ceil(Math.random()*1000000000000000)
const queryString = window.location.search;
const urlParams = queryString && new URLSearchParams(queryString) || new Map();
const connectToSessionId = urlParams.get('sessionId');
const resultSessionId = connectToSessionId ? connectToSessionId : sessionId;

Vue.use(new VueSocketIO({
    debug: true,
    connection: `ws://192.168.10.33:3001/dynamic-${resultSessionId}`,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}))


new Vue({
  //@ts-ignore
  sockets: {
    connect: function () {
      console.log('socket connected');
      //@ts-ignore
      this.$socket.emit("state_changed", { data: this.$route.fullPath });
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
