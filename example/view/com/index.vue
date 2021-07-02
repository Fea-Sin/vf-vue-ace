<template>
  <div>
    <div class="title">COM</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Com extends Vue {}
</script>
<style lang="less" scoped>
.title {
  color: blueviolet;
  font-size: 20px;
}
</style>
