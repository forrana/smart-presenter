import Vue from "vue";
import VueRouter from "vue-router";
import LangCard from "../components/LangCard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "intro",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LangCard
  },
  // {
  //   path: "/",
  //   name: "intro",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Introduction.vue")
  // },
  // {
  //   path: "/spin",
  //   name: "spin",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Spin.vue")
  // },
  // {
  //   path: "/fire",
  //   name: "fire",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Fire.vue")
  // },
  // {
  //   path: "/firespinner",
  //   name: "firespinner",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Firespinner.vue")
  // },
  // {
  //   path: "/poi",
  //   name: "poi",
  //   // route level23456/api/product-categories code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Poi.vue")
  // },
  // {
  //   path: "/comet",
  //   name: "comet",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Comet.vue")
  // },
  // {
  //   path: "/dragon",
  //   name: "dragon",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Dragon.vue")
  // },
  // {
  //   path: "/flamma",
  //   name: "flamma",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Flamma.vue")
  // },
  // {
  //   path: "/travel",
  //   name: "travel",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Travel.vue")
  // },
  // {
  //   path: "/valkeakoski",
  //   name: "valkeakoski",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Valkeakoski.vue")
  // },
  // {
  //   path: "/theend",
  //   name: "theend",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Theend.vue")
  // },

];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
