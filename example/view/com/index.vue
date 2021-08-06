<template>
  <div>
    <div>
      <Acevf width="100%" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hello from "@/view/hello.vue";
import Acevf from "@/ace.vue";

@Component({
  components: {
    Hello,
    Acevf,
  },
})
export default class Com extends Vue {}
</script>
<style lang="less" scoped>
.title {
  color: blueviolet;
  font-size: 20px;
  padding: 16px;
}
</style>
