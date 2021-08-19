<template>
  <div class="box">
    <VFDiff
      width="100%"
      height="750px"
      :fontSize="14"
      theme="github"
      :showGutter="true"
      :readOnly="false"
      :highlightActiveLine="true"
      :tabSize="2"
      :value="myValue"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VFDiff from "@/diff";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const Theme = ["solarized_light", "github"];
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
    `// Use this tool to display differences in code.
// Deletions will be highlighted on the left, insertions highlighted on the right.`,
    `// Use this too to show difference in code.
// Deletions will be highlighted on the left, insertions highlighted on the right.
// The diff highlighting style can be altered in CSS.
`,
  ];
}
</script>
<style lang="less" scoped>
.box {
  color: #545454;
}
</style>
