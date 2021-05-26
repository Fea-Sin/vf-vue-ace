<template>
  <div :class="['example']">
    <div class="vf-box">{{ msg }}</div>
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
</style>
