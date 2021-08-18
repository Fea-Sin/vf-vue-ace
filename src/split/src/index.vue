<template>
  <div ref="refEditor" :id="name" :style="divStyle" />
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { IOrientation } from "../../../types/split";
import {
  IEditorProps,
  IEditorOptions,
  IAceEditor,
  ICommand,
  IMarker,
  EditorOptionsType,
} from "../../../types/ace";
import { getAceInstance, isInShadow, editorOptions } from "@/utils";
import * as AceBuilds from "ace-builds";
import { Range } from "ace-builds";
import { Split } from "ace-builds/src-noconflict/ext-split";
const isEqual = require("lodash.isequal");
const debounce = require("lodash.debounce");

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
  @Prop() onChange?: (value: any, event: any) => void;
  @Prop() onPaste?: (value: string) => void;
  @Prop() onSelectionChange?: (value: any, event: any) => void;
  @Prop() onChangeCursor?: (value: any, event: any) => void;
  @Prop() onLoad?: (editor: AceBuilds.Ace.Editor) => void;
  @Prop() onScroll?: (editor: AceBuilds.Ace.Editor) => void;
  @Prop() minLines?: number;
  @Prop() maxLines?: number;
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

  created() {
    (this as any).debounceResize = debounce(this.onHandleResize, 100);
  }

  mounted(): void {
    const {
      className,
      onBeforeLoad,
      mode = "mysql",
      theme = "solarized_light",
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
      annotations = [],
      markers = [],
      splits,
      editorProps = {},
      setOptions,
      readOnly,
    } = this;

    const { refEditor } = this.$refs;

    this.editor = ace.edit(refEditor as HTMLElement);

    if (isInShadow(refEditor as HTMLElement)) {
      this.editor.renderer.attachToShadowRoot();
    }
    if (theme) {
      this.editor.setTheme(`ace/theme/${theme}`);
    }
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
    this.editor.setOption("highlightActiveLine", false);

    const editorPropsKey = Object.keys(editorProps);

    split.forEach((editor: IAceEditor, index: number) => {
      for (let i = 0; i < editorPropsKey.length; i++) {
        editor[editorPropsKey[i]] = editorProps[editorPropsKey[i]];
      }
      const defaultValueForEditor = defaultValue[index];
      const valueForEditor = value[index] || "";
      editor.session.setUndoManager(new ace.UndoManager());
      if (theme) {
        editor.setTheme(`ace/theme/${theme}`);
      }
      editor.renderer.setScrollMargin(
        scrollMargin[0],
        scrollMargin[1],
        scrollMargin[2],
        scrollMargin[3]
      );
      if (mode) {
        editor.session.setMode(`ace/mode/${mode}`);
      }
      editor.setFontSize(`${fontSize}px`);
      editor.renderer.setShowGutter(showGutter);
      editor.session.setUseWrapMode(wrapEnabled);
      editor.setShowPrintMargin(showPrintMargin);
      editor.on("focus", (event) => this.onFocusVF(event, editor));
      editor.on("blur", (event) => this.onBlurVF(event, editor));
      editor.on("copy", this.onCopyVF as any);
      editor.on("input", this.onInputVF as any);
      editor.on("paste", this.onPasteVF);
      editor.on("change", this.onChangeVF);
      editor.session.selection.on("changeSelect", this.onSelectionChangeVF);
      editor.session.selection.on("changeCursor", this.onChangeCursorVF);
      editor.session.on("changeScrollTop", this.onScrollVF);
      editor.setValue(
        defaultValueForEditor === undefined
          ? valueForEditor
          : defaultValueForEditor,
        cursorStart
      );

      const newAnnotations = annotations[index] || [];
      const newMarkers = markers[index] || [];
      editor.session.setAnnotations(newAnnotations);
      if (newMarkers && newMarkers.length > 0) {
        this.handleMarkers(newMarkers, editor);
      }

      // get a list of possible options to avoid 'misspelled option errors'
      const availableOptions = this.splitEditor.$options;
      for (let i = 0; i < editorOptions.length; i++) {
        const option: any = editorOptions[i];
        if (availableOptions.hasOwnProperty(option)) {
          // @ts-ignore
          editor.setOption(option, this[option]);
          // @ts-ignore
        } else if (this[option]) {
          console.warn(
            `VFAce: editor option ${option} was activated but not found`
          );
        }
      }
      this.handleOptions(setOptions as IEditorOptions, editor);

      if (Array.isArray(commands)) {
        commands.forEach((command) => {
          if (typeof command.exec === "string") {
            editor.commands.bindKey(command.bindKey, command.exec as any);
          } else {
            editor.commands.addCommand(command as any);
          }
        });
      }
      if (keyboardHandler) {
        editor.setKeyboardHandler("ace/keyboard/" + keyboardHandler);
      }
      if (readOnly) {
        editor.setOption("readOnly", readOnly);
      }
    });

    if (className) {
      (refEditor as HTMLElement).className += " " + className;
    }
    if (focus) {
      this.splitEditor.focus();
    }
    const sp = this.editor.env.split;
    sp.setOrientation(this.orientation === "below" ? sp.BELOW : sp.BESIDE);
    sp.resize(true);
    if (onLoad) {
      onLoad(sp);
    }
    (window as any).MYEDITOR = this.editor;
    window.addEventListener("resize", (this as any).debounceResize);
  }

  destroyed() {
    window.removeEventListener("resize", (this as any).debounceResize);
    this.editor.destroy();
    this.editor = null as any;
  }

  @Watch("splits")
  onSplitsChange(val: number) {
    const split = this.editor.env.split;
    split.setSplits(val);
  }

  @Watch("orientation")
  onOrientationChange(val: IOrientation) {
    const split = this.editor.env.split;
    split.setOrientation(val === "below" ? split.BELOW : split.BESIDE);
  }
  @Watch("width")
  onWidthChange() {
    this.editor.resize();
  }

  @Watch("height")
  onHeightChange() {
    this.editor.resize();
  }
  @Watch("focus")
  onFocusChange() {
    this.splitEditor.focus();
  }
  @Watch("theme")
  onThemeChange(val: string) {
    if (val) {
      const split = this.editor.env.split;
      split.setTheme("ace/theme/" + val);
    }
  }

  @Watch("className")
  onClassNameChange(val: string, oldVal: string) {
    const { refEditor } = this.$refs;
    const appliedClasses = (refEditor as HTMLElement).className;
    const appliedClassesArray = appliedClasses.trim().split(" ");
    const oldClassArray = oldVal.trim().split(" ");
    oldClassArray.forEach((oldClass) => {
      const index = appliedClassesArray.indexOf(oldClass);
      appliedClassesArray.splice(index, 1);
    });
    (refEditor as HTMLElement).className =
      " " + val + " " + appliedClassesArray.join(" ");
  }

  @Watch("mode")
  onModeChange(val: string) {
    if (val) {
      const split = this.editor.env.split;
      split.forEach((editor: IAceEditor) => {
        editor.session.setMode("ace/mode/" + val);
      });
    }
  }
  @Watch("keyboardHandler")
  onKeyboardHandlerChange(val: string) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      if (val) {
        editor.setKeyboardHandler("ace/keyboard/" + val);
      } else {
        editor.setKeyboardHandler(null as any);
      }
    });
  }

  @Watch("fontSize")
  onFontSizeChange(val: number) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.setFontSize(`${val}px`);
    });
  }
  @Watch("minLines")
  onMinLinesChange(val: number) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.setOption("minLines", val);
    });
  }
  @Watch("maxLines")
  onMaxLinesChange(val: number) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.setOption("maxLines", val);
    });
  }
  @Watch("readOnly")
  onReadOnlyChange(val: boolean) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.setOption("readOnly", val);
    });
  }
  @Watch("highlightActiveLine")
  onHighlightActiveLineChange(val: boolean) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.setOption("highlightActiveLine", val);
    });
  }
  @Watch("tabSize")
  onTabSizeChange(val: number) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.setOption("tabSize", val);
    });
  }
  @Watch("enableBasicAutocompletion")
  onEnableBasicAutocompletionChange(val: boolean | string[]) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.setOptions({
        enableBasicAutocompletion: val,
      });
    });
  }
  @Watch("enableLiveAutocompletion")
  onEnableLiveAntocompletionChange(val: boolean | string[]) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.setOptions({
        enableLiveAutocompletion: val,
      });
    });
  }

  @Watch("wrapEnabled")
  onWrapEnabledChange(val: boolean) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.session.setUseWrapMode(val);
    });
  }

  @Watch("showPrintMargin")
  onShowPrintMarginChange(val: boolean) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.setShowPrintMargin(val);
    });
  }

  @Watch("showGutter")
  onShowGutterChange(val: boolean) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      editor.renderer.setShowGutter(val);
    });
  }

  @Watch("setOptions")
  onSetOptionsChange(val: IEditorOptions) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor) => {
      this.handleOptions(val, editor);
    });
  }

  @Watch("value")
  onValueChange(val: string[]) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor, index: number) => {
      // editor.setValue is a synchronous function call, change event is emitted before setValue return.
      const nextValue = val[index] || "";
      this.silent = true;
      const pos = editor.session.selection.toJSON();
      editor.setValue(nextValue, this.cursorStart);
      editor.session.selection.fromJSON(pos);
      this.silent = false;
    });
  }

  @Watch("annotations")
  onAnnotationsChange(
    val: AceBuilds.Ace.Annotation[][],
    oldVal: AceBuilds.Ace.Annotation[][]
  ) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor, index: number) => {
      const newAnnotations = val[index] || [];
      const oldAnnotations = oldVal[index] || [];
      if (!isEqual(newAnnotations, oldAnnotations)) {
        editor.session.setAnnotations(newAnnotations);
      }
    });
  }

  @Watch("markers")
  onMarkersChange(val: IMarker[][], oldVal: IMarker[][]) {
    const split = this.editor.env.split;
    split.forEach((editor: IAceEditor, index: number) => {
      const newMarkers = val[index] || [];
      const oldMarkers = oldVal[index] || [];
      if (!isEqual(newMarkers, oldMarkers) && Array.isArray(newMarkers)) {
        this.handleMarkers(newMarkers, editor);
      }
    });
  }

  onHandleResize() {
    (window as any).MYEDITOR.resize();
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
  onPasteVF({ text }: { text: string }) {
    if (this.onPaste) {
      this.onPaste(text);
    }
  }
  onChangeVF(event: any) {
    if (this.onChange && !this.silent) {
      const value: any = [];
      this.editor.env.split.forEach((editor: IAceEditor) => {
        value.push(editor.getValue());
      });
      this.onChange(value, event);
    }
  }
  onSelectionChangeVF(event: any) {
    if (this.onSelectionChange) {
      const value: any = [];
      this.editor.env.split.forEach((editor: IAceEditor) => {
        value.push(editor.getSession());
      });
      this.onSelectionChange(value, event);
    }
  }
  onChangeCursorVF(event: any) {
    if (this.onChangeCursor) {
      const value: any = [];
      this.editor.env.split.forEach((editor: IAceEditor) => {
        value.push(editor.getSelection());
      });
      this.onChangeCursor(value, event);
    }
  }
  onScrollVF() {
    if (this.onScroll) {
      this.onScroll(this.editor);
    }
  }
  handleMarkers(markers: IMarker[], editor: IAceEditor) {
    // remove foreground markers
    let currentMarkers = editor.session.getMarkers(true);
    for (let i in currentMarkers) {
      if (currentMarkers.hasOwnProperty(i)) {
        editor.session.removeMarker(currentMarkers[i].id);
      }
    }

    // remove background markers
    currentMarkers = editor.session.getMarkers(false);
    for (let i in currentMarkers) {
      if (currentMarkers.hasOwnProperty(i)) {
        editor.session.removeMarker(currentMarkers[i].id);
      }
    }

    // add new markers
    markers.forEach(
      ({
        startRow,
        startCol,
        endRow,
        endCol,
        className,
        type,
        inFront = false,
      }) => {
        const range = new Range(startRow, startCol, endRow, endCol);

        editor.session.addMarker(range, className, type, inFront);
      }
    );
  }
  handleOptions(setOptions: IEditorOptions, editor: IAceEditor) {
    const setOptionsArray = Object.keys(setOptions || {});
    for (let y = 0; y < setOptionsArray.length; y++) {
      let key = setOptionsArray[y];
      let value = setOptions[key as EditorOptionsType];
      editor.setOption(key as EditorOptionsType, value);
    }
  }
}
</script>
