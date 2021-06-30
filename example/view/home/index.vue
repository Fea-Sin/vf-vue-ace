<template>
  <div class="home">
    HELLO
    <ul>
      <li>基础化工程</li>
      <li>vue</li>
      <li>babel</li>
      <li>ts</li>
      <li>less</li>
      <li>sass</li>
      <li>css提取</li>
      <li>资源处理图片、字体、媒体</li>
      <li>依赖分析</li>
      <li>VUE + TS</li>
      <li>Tree Shaking</li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
.home {
  padding: 10px;
  color: green;
}
</style>
