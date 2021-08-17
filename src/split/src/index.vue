<template>
  <div ref="refEditor" :id="name" :style="divStyle" />
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IOrientation } from "../../../types/split";
import {
  IEditorProps,
  IEditorOptions,
  IAceEditor,
  ICommand,
  IMarker,
  IObject,
} from "../../../types/ace";
import { getAceInstance, isInShadow } from "@/utils";
import * as AceBuilds from "ace-builds";
import { Split } from "ace-builds/src-noconflict/ext-split";

const ace = getAceInstance();

@Component
export default class VFSplit extends Vue {
  @Prop({ default: () => "ace-editor" }) name?: string;
  @Prop() vfStyle?: Partial<CSSStyleDeclaration>;
  @Prop({ default: () => false }) focus?: boolean;
  @Prop({ default: () => "beside" }) orientation?: IOrientation;
  @Prop({ default: () => 2 }) splits?: number;
  @Prop({ default: () => "" }) mode?: string;
  @Prop({ default: () => "" }) theme?: string;
  @Prop({ default: () => "500px" }) height?: string;
  @Prop({ default: () => "500px" }) width?: string;
  @Prop() value?: string[];
  @Prop() defaultValue?: string[];
  @Prop({ default: () => 12 }) fontSize?: number;
  @Prop({ default: () => true }) showGutter?: boolean;
  @Prop() onChange?: null;
  @Prop() onPaste?: null;
  @Prop() onLoad?: null;
  @Prop() onScroll?: null;
  @Prop() minLines?: null;
  @Prop() maxLines?: null;
  @Prop({ default: () => false }) readOnly?: boolean;
  @Prop({ default: () => true }) highlightActiveLine?: boolean;
  @Prop({ default: () => false }) showPrintMargin?: boolean;
  @Prop({ default: () => 2 }) tabSize?: number;
  @Prop({ default: () => 1 }) cursorStart?: number;
  @Prop() editorProps?: IEditorProps;
  @Prop({ default: () => [0, 0, 0, 0] }) scrollMargin?: number[];
  @Prop() setOptions?: IEditorOptions;
  @Prop() wrapEnabled?: boolean;
  @Prop({ default: () => false }) enableBasicAutocompletion?: boolean;
  @Prop({ default: () => false }) enableLiveAutocompletion?: boolean;
  @Prop() className?: string;
  @Prop() onBeforeLoad?: (ace: typeof AceBuilds) => void;
  @Prop() keyboardHandler?: string;
  @Prop() commands?: ICommand[];
  @Prop() annotations?: AceBuilds.Ace.Annotation[][];
  @Prop() markers?: IMarker[][];
  @Prop() onFocus?: (event: any, editor?: AceBuilds.Ace.Editor) => void;
  @Prop() onBlur?: (event: any, editor?: AceBuilds.Ace.Editor) => void;
  @Prop() onInput?: (event?: any) => void;
  @Prop() onCopy?: (value: string) => void;

  editor!: IAceEditor;
  silent!: boolean;
  split!: IAceEditor;
  splitEditor!: IAceEditor;

  get divStyle(): Partial<CSSStyleDeclaration> {
    const { width, height, vfStyle } = this;
    return {
      width,
      height,
      ...vfStyle,
    };
  }

  mounted(): void {
    const {
      className,
      onBeforeLoad,
      mode,
      theme,
      focus,
      fontSize = 14,
      value = [],
      defaultValue = [],
      cursorStart,
      showGutter = true,
      wrapEnabled = true,
      showPrintMargin = false,
      scrollMargin = [0, 0, 0, 0],
      keyboardHandler,
      onLoad,
      commands,
      annotations,
      markers,
      splits,
      editorProps = {},
    } = this;

    const { refEditor } = this.$refs;

    this.editor = ace.edit(refEditor as HTMLElement);
    if (isInShadow(refEditor as HTMLElement)) {
      this.editor.renderer.attachToShadowRoot();
    }
    this.editor.setTheme(`ace/theme/${theme}`);
    if (onBeforeLoad) {
      onBeforeLoad(ace);
    }

    const split = new Split(
      this.editor.container,
      `ace/theme/${theme}`,
      splits
    );

    this.editor.env.split = split;
    this.splitEditor = split.getEditor(0);

    // In a split scenario we don't want a print margin
    this.editor.setShowPrintMargin(false);
    this.editor.renderer.setShowGutter(false);

    const editorPropsKey = Object.keys(editorProps);

    split.forEach((editor: IAceEditor, index: number) => {
      for (let i = 0; i < editorPropsKey.length; i++) {
        editor[editorPropsKey[i]] = editorProps[editorPropsKey[i]];
      }
      const defaultValueForEditor = defaultValue[index];
      const valueForEditor = value[index] || "";
      editor.session.setUndoManager(new ace.UndoManager());
      editor.setTheme(`ace/theme/${theme}`);
      editor.renderer.setScrollMargin(
        scrollMargin[0],
        scrollMargin[1],
        scrollMargin[2],
        scrollMargin[3]
      );
      editor.session.setMode(`ace/mode/${mode}`);
      editor.setFontSize(`${fontSize}px`);
      editor.renderer.setShowGutter(showGutter);
      editor.session.setUseWrapMode(wrapEnabled);
      editor.setShowPrintMargin(showPrintMargin);
      editor.on("focus", (event) => this.onFocusVF(event, editor));
      editor.on("blur", (event) => this.onBlurVF(event, editor));
      editor.on("copy", this.onCopyVF as any);
      editor.on("input", this.onInputVF as any);
    });
  }

  onFocusVF(event: any, editor: IAceEditor): void {
    if (this.onFocus) {
      this.onFocus(event, editor);
    }
  }
  onBlurVF(event: any, editor: IAceEditor) {
    if (this.onBlur) {
      this.onBlur(event, editor);
    }
  }
  onInputVF(event: any) {
    if (this.onInput) {
      this.onInput(event);
    }
  }
  onCopyVF(text: string): void {
    if (this.onCopy) {
      this.onCopy(text);
    }
  }
}
</script>
