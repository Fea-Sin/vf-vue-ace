import * as AceBuilds from "ace-builds";

type EditorOption =
  | "minLines"
  | "maxLines"
  | "readOnly"
  | "highlightActiveLine"
  | "tabSize"
  | "enableBasicAutocompletion"
  | "enableLiveAutocomletion"
  | "enableSnippets";

const editorOptions: EditorOption[] = [
  "minLines",
  "maxLines",
  "readOnly",
  "highlightActiveLine",
  "tabSize",
  "enableBasicAutocompletion",
  "enableLiveAutocomletion",
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

// Typescript globals definition to allow us to create a window object during SSR.
declare global {
  // eslint-disable-next-line
  namespace NodeJS {
    interface Global {
      window: any;
    }
  }
}

const getAceInstance = (): typeof AceBuilds => {
  let ace;
  if (typeof window === "undefined") {
    // ace-builds just needs some window object to attach ace to.
    // During SSR event just an empty object will work.
    (global as any).window = {};
    ace = require("ace-builds");
    delete (global as any).window;
  } else if ((window as any).ace) {
    // Fallback for ace.require when vanilla ACE is hosted over CDN
    ace = (window as any).ace;
    ace.acequire = (window as any).ace.require || (window as any).ace.acequire;
  } else {
    ace = require("ace-builds");
  }
  return ace;
};

const debounce = (fn: (...args: any) => void, delay: number) => {
  let timer: any = null;

  return function () {
    // eslint-disable-next-line
    const context = this;
    // eslint-disable-next-line
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args as any);
    }, delay);
  };
};

export { editorOptions, editorEvents, debounce, getAceInstance };
