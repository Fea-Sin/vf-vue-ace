import Ace, { AceName } from "./ace";
import Split, { SplitName } from "./split";

const components = [
  [AceName, Ace],
  [SplitName, Split],
];

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
  Split,
};
