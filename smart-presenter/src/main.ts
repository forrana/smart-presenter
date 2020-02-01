import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from 'socket.io-client';
const init = require("./init");
const VueSocketIO = require('vue-socket.io');
const QRCode = require('qrcode')

const canvas = document.getElementById('canvas')

interface WSMessage {
  data: String
}

function renderQrCode (sessionId: String) {
  const qrcodeUrl = `${location.href}?sessionId=${sessionId}`
  console.info("qrcodeUrl: ", qrcodeUrl);
  QRCode.toCanvas(canvas, qrcodeUrl, function (error: String) {
    if (error) console.error(error)
  })
}

let {sessionId, userId} = init.default();
console.log(sessionId, userId);
Vue.use(new VueSocketIO({
    debug: true,
    connection: `ws://localhost:3001/dynamic-${sessionId}`,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}))

new Vue({
  data: {
    isAdmin: false
  },
  //@ts-ignore
  sockets: {
    connect: function () {
      console.log('socket connected');
      //@ts-ignore
      this.$socket.emit("register_user", { userId });
    },
    state_changed: function(message: WSMessage) {
      if(!this.isAdmin)
      //@ts-ignore
        router.push({ path: message.data })
    },
    user_registered: function(message: WSMessage) {
      if(message.data == userId) {
        this.isAdmin = true;
        renderQrCode(sessionId);
      }
    }
  },
  watch: {
    $route(to, from) {
      if(this.isAdmin)
        //@ts-ignore
        this.$socket.emit("state_changed", { data: to.fullPath });
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
