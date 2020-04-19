import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event/:id",
    name: "event-show",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EventShow.vue")

  },
  {
    path: "/event/create",
    name: "event-create",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EventCreate.vue")

  },
  {
    path: "*",
    name: 'not-found',
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/notFound.vue")

  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
