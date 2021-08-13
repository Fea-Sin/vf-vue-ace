<template>
  <div class="home">VF-VUE-ACE</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
.home {
  padding: 20px;
  color: #545454;
}
</style>
