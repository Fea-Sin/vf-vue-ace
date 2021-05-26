import Vue from "vue";
import App from "./App";

import "./styles/css/index.css";
import "./styles/index.less";
import "./styles/sass/index.scss";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#root");
