<template>
  <div class="box">
    <VFSplit
      width="100%"
      height="750px"
      :fontSize="20"
      :splits="3"
      :enableLiveAutocompletion="true"
      theme="solarized_light"
      mode="mysql"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VFSplit from "@/split";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const Theme = ["monokai", "solarized_light", "solarized_dark"];
const Mode = ["javascript", "mysql", "java", "golang"];

Theme.forEach((theme) => {
  require(`ace-builds/src-noconflict/theme-${theme}`);
});
Mode.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

@Component({
  components: {
    VFSplit,
  },
})
export default class TestSplit extends Vue {}
</script>
<style lang="less" scoped>
.box {
  color: #545454;
}
</style>
