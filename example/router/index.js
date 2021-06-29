import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Layout from "../layout/index.vue";

const contentRoutes = [
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

const createRouter = () =>
  new VueRouter({
    routes: contentRoutes,
  });

const router = createRouter();

export default router;
