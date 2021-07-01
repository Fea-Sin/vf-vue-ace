<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
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
