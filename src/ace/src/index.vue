<template>
  <div ref="refEditor" :id="name" :style="divStyle"></div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Ace, Range } from "ace-builds";
import * as AceBuilds from "ace-builds";

import {
  IObject,
  IMarker,
  IEditorProps,
  ICommand,
  IAceEditor,
  IEditorOptions,
  EditorOptionsType,
} from "../../../types/ace";
import { getAceInstance, editorOptions, isInShadow } from "@/utils";

const ace = getAceInstance();

@Component
export default class VFAce extends Vue {
  @Prop({ default: () => "ace-editor" }) name?: string;
  @Prop() vfStyle!: Partial<CSSStyleDeclaration>;
  @Prop({ default: () => "" }) mode?: string | IObject;
  @Prop({ default: () => "" }) theme?: string;
  @Prop() className?: string;
  @Prop({ default: () => "500px" }) height?: string;
  @Prop({ default: () => "500px" }) width?: string;
  @Prop({ default: () => 12 }) fontSize?: number | string;
  @Prop({ default: () => true }) showGutter?: boolean;
  @Prop({ default: () => true }) showPrintMargin?: boolean;
  @Prop({ default: () => true }) highlightActiveLine?: boolean;
  @Prop({ default: () => false }) focus?: boolean;
  @Prop({ default: () => 1 }) cursorStart?: number;
  @Prop({ default: () => false }) wrapEnabled?: boolean;
  @Prop({ default: () => false }) readOnly?: boolean;
  @Prop({ default: () => null }) minLines?: number;
  @Prop({ default: () => null }) maxLines?: number;
  @Prop({ default: () => true }) navigateToFileEnd?: boolean;
  @Prop({ default: () => false }) enableBasicAutocompletion?:
    | boolean
    | string[];
  @Prop({ default: () => false }) enableLiveAutocompletion?: boolean | string[];
  @Prop({ default: () => 4 }) tabSize?: number;
  @Prop() value?: string;
  @Prop({ default: () => null }) placeholder?: string;
  @Prop() defaultValue?: string;
  @Prop({ default: () => [0, 0, 0, 0] }) scrollMargin?: number[];
  @Prop({ default: () => false }) enableSnippets?: boolean;
  @Prop() onSelectionChange?: (value: any, event?: any) => void;
  @Prop() onCursorChange?: (value: any, event?: any) => void;
  @Prop() onInput?: (event?: any) => void;
  @Prop({ default: () => null }) onLoad?: (editor: Ace.Editor) => void;
  @Prop() onValidate?: (annotations: Ace.Annotation[]) => void;
  @Prop() onBeforeLoad?: (ace: typeof AceBuilds) => void;
  @Prop({ default: () => null }) onChange?: (
    value: string,
    event?: any
  ) => void;
  @Prop() onSelection?: (selectedText: string, event?: any) => void;
  @Prop() onCopy?: (value: string) => void;
  @Prop({ default: () => null }) onPaste?: (value: string) => void;
  @Prop() onFocus?: (event: any, editor?: Ace.Editor) => void;
  @Prop() onBlur?: (event: any, editor?: Ace.Editor) => void;
  @Prop({ default: () => null }) onScroll?: (editor: IEditorProps) => void;
  @Prop() editorProps?: IEditorProps;
  @Prop() setOptions!: IEditorOptions;
  @Prop() keyboardHandler?: string;
  @Prop() commands?: ICommand;
  @Prop() annotations?: Ace.Annotation[];
  @Prop() markers?: IMarker[];

  editor!: IAceEditor;
  refEditor!: HTMLElement;
  silent!: boolean;

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
      onValidate,
      mode,
      focus,
      theme,
      fontSize = 12,
      value,
      defaultValue,
      showGutter,
      wrapEnabled,
      showPrintMargin,
      scrollMargin = [0, 0, 0, 0],
      keyboardHandler,
      onLoad,
      commands,
      annotations,
      markers,
      placeholder,
      editorProps = {},
      navigateToFileEnd,
      setOptions,
      enableLiveAutocompletion,
      readOnly,
    } = this;

    const { refEditor } = this.$refs;

    this.editor = ace.edit(refEditor as HTMLElement);
    if (onBeforeLoad) {
      onBeforeLoad(ace);
    }

    const editorPropsArray = Object.keys(editorProps);
    for (let i = 0; i < editorPropsArray.length; i++) {
      this.editor[editorPropsArray[i]] = editorProps[editorPropsArray[i]];
    }

    this.editor.renderer.setScrollMargin(
      scrollMargin[0],
      scrollMargin[1],
      scrollMargin[2],
      scrollMargin[3]
    );

    if (isInShadow(refEditor as HTMLElement)) {
      this.editor.renderer.attachToShadowRoot();
    }
    if (mode && mode !== "") {
      this.editor.session.setMode(`ace/mode/${mode}`);
    }

    if (theme && theme !== "") {
      this.editor.setTheme(`ace/theme/${theme}`);
    }

    this.editor.setFontSize(
      typeof fontSize === "number" ? `${fontSize}px` : fontSize
    );

    this.editor
      .getSession()
      .setValue(!defaultValue ? value || "" : defaultValue);

    if (navigateToFileEnd) {
      this.editor.navigateFileEnd();
    }

    this.editor.renderer.setShowGutter(showGutter as boolean);
    this.editor.getSession().setUseWrapMode(wrapEnabled as boolean);
    this.editor.setShowPrintMargin(showPrintMargin as boolean);
    this.editor.on("focus", this.onFocusVf);
    this.editor.on("blur", this.onBlurVf);
    this.editor.on("copy", this.onCopyVf);
    this.editor.on("paste", this.onPasteVf);
    this.editor.on("change", this.onChangeVf);
    this.editor.on("input", this.onInputVf);
    if (placeholder) {
      this.updatePlaceholder();
    }

    this.editor
      .getSession()
      .selection.on("changeSelection", this.onSelectionChangeVf);

    this.editor
      .getSession()
      .selection.on("changeCursor", this.onCursorChangeVf);
    if (onValidate) {
      // @ts-ignore types don't include
      this.editor.getSession().on("changeAnnontation", () => {
        const annotations = this.editor.getSession().getAnnotations();
        onValidate(annotations);
      });
    }
    this.editor.session.on("changeScrollTop", this.onScrollVf);
    this.editor.getSession().setAnnotations(annotations as any);
    if (markers && markers.length > 0) {
      this.handleMarkers(markers);
    }

    // get a list of possible options to avoid 'misspelled option errors'
    const availableOptions = this.editor.$options;
    editorOptions.forEach((option: any) => {
      if (availableOptions.hasOwnProperty(option)) {
        // @ts-ignore
        this.editor.setOption(option, this[option]);
        // @ts-ignore
      } else if (this[option]) {
        console.warn(
          `vf-vue-ace: editor option ${option} was activated but not fond. Did you need to import a related tool or did you possibly mispell the options`
        );
      }
    });

    this.handleOptions(setOptions);

    if (Array.isArray(commands)) {
      commands.forEach((command) => {
        if (typeof command.exec === "string") {
          this.editor.commands.bindKey(command.bindKey, command.exec);
        } else {
          this.editor.commands.addCommand(command);
        }
      });
    }

    if (keyboardHandler) {
      this.editor.setKeyboardHandler("ace/keyboard/" + keyboardHandler);
    }
    if (readOnly) {
      this.editor.setOption("readOnly", readOnly);
    }

    if (className) {
      (this.$refs.refEditor as HTMLElement).className += " " + className;
    }
    if (enableLiveAutocompletion) {
      this.editor.setOptions({
        enableLiveAutocompletion: enableLiveAutocompletion,
      });
    }

    if (onLoad) {
      onLoad(this.editor);
    }
    this.editor.resize();
    if (focus) {
      this.editor.focus();
    }
  }

  destroyed() {
    this.editor.destroy();
    this.editor = null as any;
  }

  @Watch("minLines")
  onMinLinesChange(val: number) {
    this.editor.setOption("minLines", val);
  }

  @Watch("maxLines")
  onMaxLinesChange(val: number) {
    this.editor.setOption("maxLines", val);
  }

  @Watch("readOnly")
  onReadOnlyChange(val: boolean) {
    this.editor.setOption("readOnly", val);
  }
  @Watch("highlightActiveLine")
  onHighlightActiveLineChange(val: boolean) {
    this.editor.setOption("highlightActiveLine", val);
  }
  @Watch("tabSize")
  onTabSizeChange(val: number) {
    this.editor.setOption("tabSize", val);
  }

  @Watch("enableBasicAutocompletion")
  onEnableBasicAutocompletionChange(val: boolean | string[]) {
    this.editor.setOptions({
      enableBasicAutocompletion: val,
    });
  }

  @Watch("enableLiveAutocompletion")
  onEnableLiveAntocompletionChange(val: boolean | string[]) {
    this.editor.setOptions({
      enableLiveAutocompletion: val,
    });
  }

  @Watch("enableSnippets")
  onEnableSnippetsChange(val: boolean) {
    this.editor.setOptions({
      enableSnippets: val,
    });
  }

  @Watch("className")
  onClassNameChange(val: string, oldVal: string) {
    const appliedClasses = this.refEditor.className;
    const appliedClassesArray = appliedClasses.trim().split(" ");
    const oldClassArray = oldVal.trim().split(" ");
    oldClassArray.forEach((oldClass) => {
      const index = appliedClassesArray.indexOf(oldClass);
      appliedClassesArray.splice(index, 1);
    });
    this.refEditor.className = " " + val + " " + appliedClassesArray.join(" ");
  }

  @Watch("value")
  onValueChange(val: string) {
    this.silent = true;
    const pos = this.editor.session.selection.toJSON();
    this.editor.setValue(val, this.cursorStart);
    this.editor.session.selection.fromJSON(pos);
    this.silent = false;
  }

  @Watch("placeholder")
  onPlaceholderChange() {
    this.updatePlaceholder();
  }

  @Watch("mode")
  onModeChange(val: string | IObject) {
    this.editor.session.setMode("ace/mode/" + val);
  }

  @Watch("theme")
  onThemeChange(val: string) {
    this.editor.setTheme("ace/theme/" + val);
  }

  @Watch("keyboardHandler")
  onKeyboardHandlerChange(val: string) {
    if (val) {
      this.editor.setKeyboardHandler("ace/keyboard/" + val);
    } else {
      this.editor.setKeyboardHandler(null as any);
    }
  }

  @Watch("fontSize")
  onFontSizeChange(val: number | string) {
    this.editor.setFontSize(typeof val === "number" ? `${val}px` : val);
  }

  @Watch("wrapEnabled")
  onWrapEnabled(val: boolean) {
    this.editor.getSession().setUseWrapMode(val);
  }

  @Watch("showPrintMargin")
  onShowPrintMarginChange(val: boolean) {
    this.editor.setShowPrintMargin(val);
  }

  @Watch("showGutter")
  onShowGutter(val: boolean) {
    this.editor.renderer.setShowGutter(val);
  }

  @Watch("setOptions")
  onSetOptionsChange(val: IEditorOptions) {
    this.handleOptions(val);
  }

  @Watch("annotations")
  onAnnotationsChange(val: Ace.Annotation[]) {
    this.editor.getSession().setAnnotations(val || []);
  }

  @Watch("markers")
  onMarkersChange(val: IMarker[]) {
    this.handleMarkers(val);
  }

  @Watch("scrollMargin")
  onScrollMarginChange(val: number[]) {
    this.handleScrollMargins(val);
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
    this.editor.focus();
  }

  onFocusVf(event: any): void {
    if (this.onFocus) {
      this.onFocus(event, this.editor);
    }
  }
  onBlurVf(event: any): void {
    if (this.onBlur) {
      this.onBlur(event, this.editor);
    }
  }
  onCopyVf({ text }: { text: string }): void {
    if (this.onCopy) {
      this.onCopy(text);
    }
  }
  onPasteVf({ text }: { text: string }): void {
    if (this.onPaste) {
      this.onPaste(text);
    }
  }
  onChangeVf(event: any): void {
    if (this.onChange && !this.silent) {
      const value = this.editor.getValue();
      this.onChange(value, event);
    }
  }
  onInputVf(event?: any): void {
    if (this.onInput) {
      this.onInput(event);
    }
    if (this.placeholder) {
      this.updatePlaceholder();
    }
  }

  handleScrollMargins(margins = [0, 0, 0, 0]) {
    this.editor.renderer.setScrollMargin(
      margins[0],
      margins[1],
      margins[2],
      margins[3]
    );
  }

  updatePlaceholder(): void {
    const { placeholder, editor } = this;
    const showPlaceholder = !editor.session.getValue().length;
    let node = editor.renderer.placeholderNode;
    if (!showPlaceholder && node) {
      (editor.renderer.scroller as any).removeChild(
        editor.renderer.placeholderNode as HTMLElement
      );
      editor.renderer.placeholderNode = undefined;
    } else if (showPlaceholder && !node) {
      node = editor.renderer.placeholderNode = document.createElement("div");
      node.textContent = placeholder || "";
      node.className = "ace_comment ace_placeholder";
      node.style.padding = "0 9px";
      node.style.position = "absolute";
      node.style.zIndex = "3";
      (editor.renderer.scroller as any).appendChild(node);
    } else if (showPlaceholder && node) {
      node.textContent = placeholder as string;
    }
  }

  onSelectionChangeVf(event: any): void {
    if (this.onSelectionChange) {
      const value = this.editor.getSelection();
      this.onSelectionChange(value, event);
    }
  }

  onCursorChangeVf(event: any): void {
    if (this.onCursorChange) {
      const value = this.editor.getSelection();
      this.onCursorChange(value, event);
    }
  }
  onScrollVf(): void {
    if (this.onScroll) {
      this.onScroll(this.editor);
    }
  }
  handleMarkers(markers: IMarker[]): void {
    let currentMarkers = this.editor.getSession().getMarkers(true);
    for (const i in currentMarkers) {
      if (currentMarkers.hasOwnProperty(i)) {
        this.editor.getSession().removeMarker(currentMarkers[i].id);
      }
    }

    // remove background markers except active line marker and selected word marker
    currentMarkers = this.editor.getSession().getMarkers(false);
    for (const i in currentMarkers) {
      if (
        currentMarkers.hasOwnProperty(i) &&
        currentMarkers[i].clazz !== "ace_active-line" &&
        currentMarkers[i].clazz !== "ace_selected-word"
      ) {
        this.editor.getSession().removeMarker(currentMarkers[i].id);
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
        this.editor.getSession().addMarker(range, className, type, inFront);
      }
    );
  }

  handleOptions(setOptions: IEditorOptions): void {
    const setOptionsArray: any = Object.keys(setOptions || {});
    for (let y = 0; y < setOptionsArray.length; y++) {
      let key: EditorOptionsType = setOptionsArray[y];
      let value = setOptions[key];
      this.editor.setOption(key as any, value);
    }
  }
}
</script>
