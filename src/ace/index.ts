import Ace from "./src/index.vue";
export const AceName = "VfAce";

(Ace as any).install = function (Vue: any) {
  Vue.component(AceName, Ace);
};

export default Ace;
