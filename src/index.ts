import VfAce, { VfAceName } from "./ace";

const components = [[VfAceName, VfAce]];

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
  VfAce,
};
