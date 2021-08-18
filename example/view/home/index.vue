<template>
  <div class="box">
    <div class="home">VF-VUE-ACE</div>
    <div class="home">VF-VUE-SPLIT</div>
    <div class="home">VF-VUE-DIFF</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
.box {
  padding-top: 16px;
}
.home {
  padding: 16px;
  color: #545454;
}
</style>
