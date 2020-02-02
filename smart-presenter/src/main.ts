import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from 'socket.io-client';
const init = require("./init");
const VueSocketIO = require('vue-socket.io');
const QRCode = require('qrcode')


interface WSMessage {
  data: String
}

function renderQrCode (sessionId: String, userId?: String) {
  const canvas = document.getElementById('canvas')
  const params = [];
  if(sessionId) params.push(`sessionId=${sessionId}`);
  if(userId) params.push(`userId=${userId}`);

  const qrcodeUrl = `${location.origin}/?${params.join("&")}`
  console.info("qrcodeUrl: ", qrcodeUrl);
  QRCode.toCanvas(canvas, qrcodeUrl, function (error: String) {
    if (error) console.error(error)
  })
}

let {sessionId, userId} = init.default();

let getNextRoute = (routes, currentRouteName) => {
  const totalRoutes = routes.length
  const currentRouteIndex = routes.findIndex(({name}) => name == currentRouteName)
  const nextRouteIndex = currentRouteIndex == routes.length - 1 ?
    currentRouteIndex : currentRouteIndex + 1
  return routes[nextRouteIndex]
}

let getPreviousRoute = (routes, currentRouteName) => {
  const totalRoutes = routes.length
  const currentRouteIndex = routes.findIndex(({name}) => name == currentRouteName)
  const prevRouteIndex = currentRouteIndex == 0 ?
    currentRouteIndex : currentRouteIndex - 1
  return routes[prevRouteIndex]
}

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
    isAdmin: false,
  },
  props: {
    event: {
      type: String,
      default: "keyup"
    },
  },
  mounted() {
    window.addEventListener(this.event, this.emitEvent);
  },
  destroyed() {
    window.removeEventListener(this.event, this.emitEvent);
  },
  methods: {
    emitEvent: function (e: KeyboardEvent) {
      switch (e.code) {
        case "ArrowRight":
        case "Space":
        case "Enter":
          this.nextSlide();
          break;

        case "ArrowLeft":
          this.prevSlide();
          break;
      }
    },
    nextSlide: function () {
      const nextRoute = getNextRoute(this.$router.options.routes, this.$route.name)
      if(nextRoute.name !== this.$route.name)
        router.push({ path: nextRoute.path })
    },
    prevSlide: function () {
      const prevRoute = getPreviousRoute(this.$router.options.routes, this.$route.name)
      if(prevRoute.name !== this.$route.name)
        router.push({ path: prevRoute.path })
    }
  },
  //@ts-ignore
  sockets: {
    connect: function () {
      //@ts-ignore
      this.$socket.emit("register_user", { userId });
    },
    state_changed: function(message: WSMessage) {
      if(!this.isAdmin && message.date != this.$route.fullPath)
      //@ts-ignore
        router.push({ path: message.data })
    },
    user_registered: function(message: WSMessage) {
      if(message.data == userId) {
        this.isAdmin = true;
        renderQrCode(sessionId, userId);
      } else renderQrCode(sessionId);
    },
    user_deregistered: function(message: WSMessage) {
      this.isAdmin = false;
      renderQrCode(sessionId);
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
