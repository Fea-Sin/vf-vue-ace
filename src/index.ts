import Ace, { AceName } from "./ace";

const components = [[AceName, Ace]];

function install(Vue: any) {
  components.forEach((componentArray) => {
    Vue.component(componentArray[0], componentArray[1]);
  });
}

if (typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Ace,
};
