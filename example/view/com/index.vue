<template>
  <div class="con">
    <div class="left">
      <div class="box">
        <h3 class="inline">Font Size</h3>
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
      <div class="box">
        <h3 class="inline">Theme</h3>
        <select class="vfSelect" :value="vfTheme" @change="themeChange">
          <option v-for="item in vfThemeArray" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="box">
        <h3 class="inline">LiveAutocompletion</h3>
        <input
          type="checkbox"
          :checked="enableLiveAutocompletion"
          @change="handleLiveAutocompletion"
        />
      </div>
      <div class="box">
        <h3 class="inline">Show Print Margin</h3>
        <input
          type="checkbox"
          :checked="showPrintMargin"
          @change="handleShowPrintMargin"
        />
      </div>
      <div class="box">
        <h3 class="inline">Tab Size</h3>
        <select class="vfSelect" :value="vfTabSize" @change="handleTabSize">
          <option v-for="item in tabSizeArray" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="box">
        <h3 class="inline">ReadOnly</h3>
        <input type="checkbox" :checked="readOnly" @change="handleReadOnly" />
      </div>
      <div class="box">
        <div class="button" @click="showCurrentValue">当前值</div>
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
        :theme="vfTheme"
        :enableLiveAutocompletion="enableLiveAutocompletion"
        :showPrintMargin="showPrintMargin"
        :readOnly="readOnly"
        :onLoad="handleOnLoad"
        :onChange="handleVfAceChange"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Acevf from "@/ace.vue";

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

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
];

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => {
  require(`ace-builds/src-noconflict/theme-${theme}`);
});
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const defaultValue = `
/**
 * 
 * 可以自动识别
 * 
 * 
 */

function onLoad(editor) {
  const value = "hello world";
  return value;
}
`;

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
  enableBasicAutocompletion = true;
  enableLiveAutocompletion: boolean | string[] = true;
  enableSnippets = true;
  showLineNumbers = true;
  tabSizeArray = [2, 4];
  vfTabSize = 2;
  vfSetOptions = {
    useWorker: false,
    showLineNumbers: this.showLineNumbers,
    tabSize: this.vfTabSize,
  };
  vfPlaceholder = "自由无碍编写代码";
  defaultValue = defaultValue;
  vfModeArray = languages;
  vfThemeArray = themes;
  vfMode = "javascript";
  vfTheme = "monokai";
  showPrintMargin = true;
  currentValue = "";
  readOnly = false;

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
    this.vfMode = event.target.value;
  }
  themeChange(event: any) {
    this.vfTheme = event.target.value;
  }
  handleOnLoad() {
    console.log("I Am Load");
  }
  handleLiveAutocompletion(event: any) {
    this.enableLiveAutocompletion = event.target.checked;
  }
  handleShowPrintMargin(event: any) {
    this.showPrintMargin = event.target.checked;
  }
  handleTabSize(event: any) {
    this.vfTabSize = Number(event.target.value);
    this.vfSetOptions = {
      ...this.vfSetOptions,
      tabSize: Number(event.target.value),
    };
  }
  handleVfAceChange(newValue: string) {
    this.currentValue = newValue;
  }
  showCurrentValue() {
    console.log("Vue Ace---->", this.currentValue);
  }
  handleReadOnly(event: any) {
    this.readOnly = event.target.checked;
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
  .button {
    padding: 8px 12px;
    color: blueviolet;
    cursor: pointer;
    border: 1px solid #999;
    display: inline-block;
  }
}
</style>
