<template>
  <div class="box">
    <VFDiff
      width="100%"
      height="750px"
      :fontSize="20"
      theme="github"
      :value="myValue"
      :onChange="handleChange"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VFDiff from "@/diff";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const Theme = ["solarized_light", "github", "solarized_dark", "monokai"];
Theme.forEach((theme) => {
  require(`ace-builds/src-noconflict/theme-${theme}`);
});

@Component({
  components: {
    VFDiff,
  },
})
export default class TestDiff extends Vue {
  myValue = [
    `
    /**
     * 
     * code diff
     * 
     * 所有差别自动检测
     * 包括空格
     * 
     */

    function onLoad(editor) {
      const value = "hello world";
      return value;
    }`,
    `
    /**
     * 
     * code diff
     * 
     * 
     */

    function onLoad(editor) {
      const value = "hello world ";
      return value;
    }`,
  ];

  handleChange(val: string[]) {
    this.myValue = val;
  }
}
</script>
<style>
.codeMarker {
  background: #fff677;
  position: absolute;
  z-index: 20;
}
</style>
<style lang="less" scoped>
.box {
  color: #545454;
}
</style>
