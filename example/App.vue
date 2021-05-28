<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "VF - UI",
    };
  },
};
</script>
<style scoped>
.example {
  color: rebeccapurple;
  font-size: 30px;
  text-align: center;
}
.content {
  padding: 10px;
  text-align: left;
}
.app {
  height: 100vh;
}
</style>
