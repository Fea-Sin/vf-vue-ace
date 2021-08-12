import VfAce from "./src/index.vue";

(VfAce as any).install = function (Vue: any) {
  Vue.component(VfAce.name, VfAce);
};

export default VfAce;
