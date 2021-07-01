import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Layout from "../layout/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Layout,
    redirect: "home",
    children: [
      {
        path: "vfa",
        name: "VFA",
        component: () => import("../view/vfa/index.vue"),
      },
      {
        path: "home",
        name: "HOME",
        component: () => import("../view/home/index.vue"),
      },
      {
        path: "vfb",
        name: "VFB",
        component: () => import("../view/vfb/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
