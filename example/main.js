import Vue from "vue";
import App from "./App";

import "./styles/index.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#root");
