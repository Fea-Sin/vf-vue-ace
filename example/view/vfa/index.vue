<template>
  <div class="con">
    <div class="vfa">test 1 sass -> VFA</div>
    <h2>处理资源的几种写法</h2>
    <div class="imgBox"></div>
    <div class="imgBoxH">
      <img :src="img" />
    </div>
    <div class="imgBoxH">
      <img :src="require('E@/assets/images/avator.png')" />
    </div>
    <div class="imgBoxH">
      <img src="../../assets/images/avator.png" />
    </div>
  </div>
</template>
<script>
import Ava from "E@/assets/images/avator.png";

export default {
  data() {
    return {
      img: Ava,
    };
  },
};
</script>
<style lang="scss" scoped>
.con {
  padding: 10px;
}
.vfa {
  color: #545454;
  margin-bottom: 20px;
}
.imgBox {
  width: 200px;
  height: 200px;
  background: url(E@/assets/images/avator.png) no-repeat;
  background-size: contain;
}
.imgBoxH {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  display: inline-block;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
