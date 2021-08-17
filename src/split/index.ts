import Split from "./src/index.vue";
export const SplitName = "VfSplit";

(Split as any).install = function (Vue: any) {
  Vue.component(SplitName, Split);
};

export default Split;
