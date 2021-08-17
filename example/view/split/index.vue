<template>
  <div class="box">
    <VFSplit width="100%" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VFSplit from "@/split";

@Component({
  components: {
    VFSplit,
  },
})
export default class TestSplit extends Vue {}
</script>
<style lang="less" scoped>
.box {
  color: #545454;
}
</style>
