<template>
  <div class="con">
    <div class="left">
      <div class="box">
        <h3>Font Size</h3>
        <select class="vfSelect" :value="vfFontSize" @change="fontSizeChange">
          <option v-for="item in fontSizeArray" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="box">
        <h3 class="inline">Show Gutter</h3>
        <input
          type="checkbox"
          :checked="showGutter"
          @change="showGutterChange"
        />
      </div>
      <div class="box">
        <h3 class="inline">HighlightActiveLine</h3>
        <input
          type="checkbox"
          :checked="highlightActiveLine"
          @change="highlightActiveLineChange"
        />
      </div>
      <div class="box">
        <h3 class="inline">ShowLineNumbers</h3>
        <input
          type="checkbox"
          :checked="showLineNumbers"
          @change="showLineNumbersChange"
        />
      </div>
      <div class="box">
        <h3 class="inline">Mode</h3>
        <select class="vfSelect" :value="vfMode" @change="modeChange">
          <option v-for="item in vfModeArray" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <div class="right">
      <Acevf
        name="vue-ace"
        width="100%"
        height="750px"
        :fontSize="vfFontSize"
        :showGutter="showGutter"
        :highlightActiveLine="highlightActiveLine"
        :setOptions="vfSetOptions"
        :placeholder="vfPlaceholder"
        :value="defaultValue"
        :mode="vfMode"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Acevf from "@/ace.vue";
import "ace-builds/webpack-resolver";

const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css",
];

const defaultValue = `
// 还可以折叠代码

/**
 * 
 * 可以自动识别
 * 
 * 
 * 
 * 
 * 
 */

function onLoad(editor) {
  console.log("I have loaded");
}`;

@Component({
  components: {
    Acevf,
  },
})
export default class Com extends Vue {
  fontSizeArray = [12, 14, 16, 18, 20, 24, 26];
  vfFontSize = 20;
  showGutter = true;
  highlightActiveLine = true;
  enableBasicAutocompletion = false;
  enableLiveAutocompletion = false;
  enableSnippets = true;
  showLineNumbers = true;
  vfTabSize = 2;
  vfSetOptions = {
    useWorker: false,
    showLineNumbers: this.showLineNumbers,
    tabSize: this.vfTabSize,
  };
  vfPlaceholder = "自由无碍编写代码";
  defaultValue = defaultValue;
  vfModeArray = languages;
  vfMode = "mysql";

  fontSizeChange(event: any) {
    this.vfFontSize = Number(event.target.value);
  }
  showGutterChange(event: any) {
    this.showGutter = event.target.checked;
  }
  highlightActiveLineChange(event: any) {
    this.highlightActiveLine = event.target.checked;
  }
  showLineNumbersChange(event: any) {
    this.vfSetOptions = {
      ...this.vfSetOptions,
      showLineNumbers: event.target.checked,
    };
  }
  modeChange(event: any) {
    console.log("change language--->", event.target.value);
    this.vfMode = event.target.value;
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/mixin.less";

.title {
  color: blueviolet;
  font-size: 20px;
  padding: 16px;
}
.con {
  color: #545454;
  .clearfix();
  .left {
    width: 20%;
    float: left;
    padding: 16px;
  }
  .right {
    width: 80%;
    float: left;
  }
  .vfSelect {
    width: 100px;
    height: 35px;
    border: 1px solid #999;
    border-radius: 2px;
  }
  .box {
    margin-bottom: 16px;
  }
  .inline {
    display: inline-block;
  }
}
</style>
