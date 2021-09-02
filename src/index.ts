import VfAce, { AceName } from "./ace";
import VfSplit, { SplitName } from "./split";
import VfDiff, { DiffName } from "./diff";

const components = [
  [AceName, VfAce],
  [SplitName, VfSplit],
  [DiffName, VfDiff],
];

function install(Vue: any) {
  components.forEach((componentArray) => {
    Vue.component(componentArray[0], componentArray[1]);
  });
}

if (typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

export const Ace = VfAce;
export const Split = VfSplit;
export const Diff = VfDiff;

export default {
  install,
  VfAce,
  VfSplit,
  VfDiff,
};
