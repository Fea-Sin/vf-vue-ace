<template>
  <div class="container">
    <div class="header">{{ title }}</div>
    <div class="nav">
      <router-link to="/home" class="box">HOME</router-link>
      <router-link to="/ace" class="box">ACE</router-link>
      <router-link to="/split" class="box">SPLIT</router-link>
    </div>
    <div class="routeBox">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Layout extends Vue {
  title = "VF-UI";
}
</script>
<style lang="less" scoped>
.container {
  height: 100vh;
}
.header {
  height: 50px;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  color: rebeccapurple;
}
.nav {
  border: 1px dashed #ff516a;
  padding: 8px;
  .box {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 18px;
    color: #647bfc;
    display: inline-block;
  }
}
.routeBox {
  min-height: 300px;
}
</style>
