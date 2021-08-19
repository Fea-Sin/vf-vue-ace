<template>
  <div>
    <div>DIFF</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import VFSplit from "@/split";

@Component({
  components: {
    VFSplit,
  },
})
export default class VFDiff extends Vue {}
</script>
<style lang="less" scoped></style>
