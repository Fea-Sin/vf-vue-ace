import * as AceBuilds from "ace-builds";

export interface IEditorOptions {
  useWorker: boolean;
  showLineNumbers: boolean;
  tabSize: number;
}
export type EditorOptionsType = "useWorker" | "showLineNumbers" | "tabSize";

export type EditorOption =
  | "minLines"
  | "maxLines"
  | "readOnly"
  | "highlightActiveLine"
  | "tabSize"
  | "enableBasicAutocompletion"
  | "enableLiveAutocompletion"
  | "enableSnippets";

const editorOptions: EditorOption[] = [
  "minLines",
  "maxLines",
  "readOnly",
  "highlightActiveLine",
  "tabSize",
  "enableBasicAutocompletion",
  "enableLiveAutocompletion",
  "enableSnippets",
];

type EditorEvent =
  | "onChange"
  | "onFocus"
  | "onInput"
  | "onBlur"
  | "onCopy"
  | "onPaste"
  | "onSelectionChange"
  | "onCursorChange"
  | "onScroll"
  | "handleOptions"
  | "updateRef";

const editorEvents: EditorEvent[] = [
  "onChange",
  "onFocus",
  "onInput",
  "onBlur",
  "onCopy",
  "onPaste",
  "onSelectionChange",
  "onCursorChange",
  "onScroll",
  "handleOptions",
  "updateRef",
];

const getAceInstance = (): typeof AceBuilds => {
  let ace;
  if (window && (window as any).ace) {
    ace = (window as any).ace;
    ace.acequire = (window as any).ace.require || (window as any).ace.acequire;
  } else {
    ace = require("ace-builds");
  }
  return ace;
};

export { editorOptions, editorEvents, getAceInstance };
