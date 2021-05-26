<template>
  <div :class="['example']">
    <div class="vf-box">{{ msg }}</div>
    <div :class="['vf-artical', 'content']">
      <div class="t1">VF-UI ARTICAL</div>
    </div>
    <div :class="['content', 'test-sass']">VF-UI TEST SASS</div>
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
</style>
