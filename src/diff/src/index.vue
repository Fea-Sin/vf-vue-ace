<template>
  <div>
    <VFSplit
      :width="width"
      :height="height"
      :fontSize="fontSize"
      :name="name"
      orientation="beside"
      :splits="2"
      :mode="mode"
      :theme="theme"
      :showGutter="showGutter"
      :onChange="onChange"
      :onPaste="onPaste"
      :onLoad="onLoad"
      :onScroll="onScroll"
      :minLines="minLines"
      :maxLines="maxLines"
      :readOnly="readOnly"
      :highlightActiveLine="highlightActiveLine"
      :showPrintMargin="showPrintMargin"
      :tabSize="tabSize"
      :cursorStart="cursorStart"
      :editorProps="editorProps"
      :style="vfStyle"
      :scrollMargin="scrollMargin"
      :setOptions="setOptions"
      :wrapEnabled="wrapEnabled"
      :enableBasicAutocompletion="enableBasicAutocompletion"
      :enableLiveAutocompletion="enableLiveAutocompletion"
      :value="value"
      :markers="diffMarkers"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import VFSplit from "@/split";
import { IObject, IEditorProps } from "../../../types/ace";
// @ts-ignore
import DiffMatchPatch from "diff-match-patch";

@Component({
  components: {
    VFSplit,
  },
})
export default class VFDiff extends Vue {
  @Prop({ default: () => "ace-editor" }) name?: string;
  @Prop() cursorStart?: number;
  @Prop() editorProps?: IObject;
  @Prop({ default: () => false }) enableBasicAutocompletion?: boolean;
  @Prop({ default: () => false }) enableLiveAutocompletion?: boolean;
  @Prop({ default: () => false }) focus?: boolean;
  @Prop({ default: () => 12 }) fontSize?: number;
  @Prop({ default: () => "500px" }) height?: string;
  @Prop({ default: () => "500px" }) width?: string;
  @Prop({ default: () => true }) highlightActiveLine?: boolean;
  @Prop() maxLines?: number;
  @Prop() minLines?: number;
  @Prop() onLoad?: (editor: IEditorProps) => void;
  @Prop() onScroll?: (editor: IEditorProps) => void;
  @Prop() onPaste?: (value: string) => void;
  @Prop() onChange?: (value: string[], event?: any) => void;
  @Prop({ default: () => "beside" }) orientation?: string;
  @Prop({ default: () => false }) readOnly?: boolean;
  @Prop({ default: () => [0, 0, 0, 0] }) scrollMargin?: number[];
  @Prop() setOptions?: IObject;
  @Prop({ default: () => true }) showGutter?: boolean;
  @Prop({ default: () => false }) showPrintMargin?: boolean;
  @Prop({ default: () => 2 }) splits?: number;
  @Prop() vfStyle?: Partial<CSSStyleDeclaration>;
  @Prop({ default: () => 2 }) tabSize?: number;
  @Prop() mode?: string;
  @Prop({ default: () => "github" }) theme?: string;
  @Prop({ default: () => ["", ""] }) value?: string[];
  @Prop({ default: () => true }) wrapEnabled?: boolean;

  diffMarkers = [[], []];

  mounted() {
    this.diffMarkers = this.diff();
  }

  @Watch("value")
  onValueChange() {
    this.diffMarkers = this.diff();
  }

  onChangeVF(value: string[]): void {
    if (this.onChange) {
      this.onChange(value);
    }
  }
  diff() {
    const dmp = new DiffMatchPatch();
    const lhString = (this.value as any)[0];
    const rhString = (this.value as any)[1];
    if (lhString.length === 0 && rhString.length === 0) {
      return [];
    }
    const diff = dmp.diff_main(lhString, rhString);
    dmp.diff_cleanupSemantic(diff);

    const diffedLines = this.generateDiffedLines(diff);
    const codeEditorSettings = this.setCodeMarkers(diffedLines);

    return codeEditorSettings;
  }
  generateDiffedLines(diff: any) {
    const C = {
      DIFF_EQUAL: 0,
      DIFF_DELETE: -1,
      DIFF_INSERT: 1,
    };
    const diffedLines = {
      left: [] as any,
      right: [] as any,
    };
    const cursor = {
      left: 1,
      right: 1,
    };

    diff.forEach((chunk: any) => {
      const chunkType = chunk[0];
      const text = chunk[1];
      let lines = text.split("\n").length - 1;

      // diff-match-patch sometimes returns empty strings at random
      if (text.length === 0) {
        return;
      }

      const firstChar = text[0];
      const lastChar = text[text.length - 1];
      let linesToHighlight = 0;

      switch (chunkType) {
        case C.DIFF_EQUAL:
          cursor.left += lines;
          cursor.right += lines;
          break;
        case C.DIFF_DELETE:
          // If the deletion starts with a newline, push the cursor down to that line
          if (firstChar === "\n") {
            cursor.left++;
            lines--;
          }

          linesToHighlight = lines;

          // If the deletion does not include a newline, highlight the same line to right
          if (linesToHighlight === 0) {
            diffedLines.right.push({
              startLine: cursor.right,
              endLine: cursor.right,
            });
          }

          // If the last character is a newline, we don't want to highlight that line
          if (lastChar === "\n") {
            linesToHighlight -= 1;
          }

          diffedLines.left.push({
            startLine: cursor.left,
            endLine: cursor.left + linesToHighlight,
          });
          cursor.left += lines;
          break;
        case C.DIFF_INSERT:
          // If the insertion starts with a newline, push the cursor down to that line
          if (firstChar === "\n") {
            cursor.right++;
            lines--;
          }
          linesToHighlight = lines;
          // If the insertion does not include a newline, highlight the same line on the left
          if (linesToHighlight === 0) {
            diffedLines.left.push({
              startLine: cursor.left,
              endLine: cursor.left,
            });
          }

          // If the last character is a newline, we don't want to highlight that line
          if (lastChar === "\n") {
            linesToHighlight -= 1;
          }

          diffedLines.right.push({
            startLine: cursor.right,
            endLine: cursor.right + linesToHighlight,
          });

          cursor.right += lines;
          break;
        default:
          throw new Error("Diff type was not defined");
      }
    });
    return diffedLines;
  }
  setCodeMarkers(diffedLines: any = { left: [], right: [] }) {
    const codeEditorSettings = [];

    const newMarkerSet = {
      left: [] as any,
      right: [] as any,
    };

    for (let i = 0; i < diffedLines.left.length; i++) {
      const markerObj = {
        startRow: diffedLines.left[i].startLine - 1,
        endRow: diffedLines.left[i].endLine,
        type: "text",
        className: "codeMarker",
      };
      newMarkerSet.left.push(markerObj);
    }

    for (let i = 0; i < diffedLines.right.length; i++) {
      const markerObj = {
        startRow: diffedLines.right[i].startLine - 1,
        endRow: diffedLines.right[i].endLine,
        type: "text",
        className: "codeMarker",
      };
      newMarkerSet.right.push(markerObj);
    }

    codeEditorSettings[0] = newMarkerSet.left;
    codeEditorSettings[1] = newMarkerSet.right;

    return codeEditorSettings;
  }
}
</script>
