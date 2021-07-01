import Vue from "vue";
import router from "./router";

import App from "./App.vue";

import "./styles/css/index.css";
import "./styles/index.less";
import "./styles/sass/index.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#root");
