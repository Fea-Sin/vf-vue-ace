import VfAce from "./ace";

const components = [VfAce];

function install(Vue: any) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

if (typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  VfAce,
};
