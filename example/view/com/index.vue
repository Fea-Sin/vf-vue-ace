<template>
  <div>
    <div>
      <Hello />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hello from "@/view/hello.vue";

@Component({
  components: {
    Hello,
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
