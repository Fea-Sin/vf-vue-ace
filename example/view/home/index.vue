<template>
  <div class="home">HELLO</div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { vftsa } from "../../utils/vfa";

@Component({
  mounted() {
    vftsa("vf-ts");
  },
})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
.home {
  padding: 10px;
  color: green;
}
</style>
