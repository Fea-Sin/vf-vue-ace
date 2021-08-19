<template>
  <div class="box">
    <VFDiff />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VFDiff from "@/diff";

@Component({
  components: {
    VFDiff,
  },
})
export default class TestDiff extends Vue {}
</script>
<style lang="less" scoped>
.box {
  padding: 16px;
  color: #545454;
}
</style>
