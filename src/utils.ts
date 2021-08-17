import * as AceBuilds from "ace-builds";
import { EditorOption } from "../types/ace";

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

const isInShadow = (node: HTMLElement): boolean => {
  let parent = node && node.parentNode;
  while (parent) {
    if (parent.toString() === "[object ShadowRoot]") {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
};

export { getAceInstance, editorOptions, isInShadow };
