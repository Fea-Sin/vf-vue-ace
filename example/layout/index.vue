<template>
  <div class="container">
    <div class="header">{{ title }}</div>
    <div class="nav">
      <router-link to="/home" class="box">HOME</router-link>
      <router-link to="/vfa" class="box">VFA</router-link>
      <router-link to="/vfb" class="box">VFB</router-link>
    </div>
    <div class="routeBox">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "VF-UI",
    };
  },
};
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
