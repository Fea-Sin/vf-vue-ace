import VfAce from "./src/index.vue";
export const VfAceName = "VfAce";

(VfAce as any).install = function (Vue: any) {
  Vue.component(VfAceName, VfAce);
};

export default VfAce;
