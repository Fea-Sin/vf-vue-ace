<template>
  <div class="box">
    <div>HELLO</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Hello extends Vue {}
</script>
<style lang="less" scoped>
.box {
  padding: 16px;
  font-size: 20px;
  color: #545454;
}
</style>
