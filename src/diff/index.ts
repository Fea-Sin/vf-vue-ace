import Diff from "./src/index.vue";
export const DiffName = "VfDiff";

(Diff as any).install = function (Vue: any) {
  Vue.component(DiffName, Diff);
};

export default Diff;
