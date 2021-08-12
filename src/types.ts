import { Ace } from "ace-builds";
import * as AceBuilds from "ace-builds";
import { IEditorOptions } from "./editorOptions";

export interface ICommandManager {
  byName: any;
  commands: any;
  platform: string;
  addCommands(commands: any[]): void;
  addCommand(command: any): void;
  exec(name: string, editor: any, args: any): void;
  bindKey?(bindKey: any, commad: any): void;
}

export interface IEditorProps {
  [index: string]: any;
  $blockScrolling?: number | boolean;
  $blockSelectEnabled?: boolean;
  $enableBlockSelect?: boolean;
  $enableMultiselect?: boolean;
  $highlightPending?: boolean;
  $highlightTagPending?: boolean;
  $multiselectOnSessionChange?: (...args: any[]) => any;
  $onAddRange?: (...args: any[]) => any;
  $onChangeAnnotation?: (...args: any[]) => any;
  $onChangeBackMarker?: (...args: any[]) => any;
  $onChangeBreakpoint?: (...args: any[]) => any;
  $onChangeFold?: (...args: any[]) => any;
  $onChangeFrontMarker?: (...args: any) => any;
  $onChangeMode?: (...args: any[]) => any;
  $onChangeTabSize?: (...args: any[]) => any;
  $onChangeWrapLimit?: (...args: any[]) => any;
  $onChangeWrapMode?: (...args: any[]) => any;
  $onCursorChange?: (...args: any[]) => any;
  $onDocumentChange?: (...args: any[]) => any;
  $onMultiSelect?: (...args: any[]) => any;
  $onRemoveRange?: (...args: any[]) => any;
  $onScrollLeftChange?: (...args: any[]) => any;
  $onScrollTopChange?: (...args: any[]) => any;
  $onSelectionChange?: (...args: any[]) => any;
  $onSingleSelect?: (...args: any[]) => any;
  $onTokenizerUpdate?: (...args: any[]) => any;
}

export interface IMarker {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  className: string;
  type: "fullLine" | "screenLine" | "text" | Ace.MarkerRenderer;
  inFront?: boolean;
}

export interface ICommandBindKey {
  win: string;
  mac: string;
}

type ICommandExecFunction = (editor: Ace.Editor, args?: any) => void;

export interface ICommand {
  name: string;
  bindKey: ICommandBindKey;
  exec: string | ICommandExecFunction;
}

export interface IAceOptions {
  [index: string]: any;
  selectionStyle?: "line" | "text";
  highlightActiveLine?: boolean;
  highlightSelectedWord?: boolean;
  readonly: boolean;
  cusorStyle?: "ace" | "slim" | "smooth" | "wide";
  mergeUndoDeltas?: false | true | "always";
  behavioursEnabled?: boolean;
  wrapBehavioursEnabled?: boolean;
  // this is needed if editor is inside scrollable page
  autoScrollEditorIntoView?: boolean;
  hScrollBarAlwaysVisible?: boolean;
  vScrollBarAlwaysVisible?: boolean;
  highlightGutterLine?: boolean;
  animatedScroll?: boolean;
  showPrintMargin?: number;
  printMarginColumn?: boolean;
  printMargin?: boolean | number;
  fadeFoldWidgets?: boolean;
  showFoldWidgets?: boolean;
  showLineNumbers: boolean;
  showGutter?: boolean;
  displayIndentGuides?: boolean;
  // number or css font-size string
  fontSize?: number | string;
  fontFamily?: string;
  maxLine?: number;
  minLine?: number;
  scrollPastEnd?: boolean;
  fixedWidthGutter?: boolean;
  // path to a theme e.g "ace/theme/textmate"
  theme?: string;
  scrollSpeed?: number;
  dragDelay?: number;
  dragEnabled?: boolean;
  focusTimout?: number;
  tooltipFollowsMouse?: boolean;
  firstLineNumber?: number;
  overwrite?: boolean;
  newLineMode?: boolean;
  useWorker?: boolean;
  useSoftTabs?: boolean;
  tabSize?: number;
  wrap?: boolean;
  foldStyle?: boolean;
  // path to a mode e.g "ace/mode/text"
  mode?: string;
  enableMultiselect?: boolean;
  enableEmmet?: boolean;
  enableBasicAutocompletion?: boolean;
  enableLiveAutocompletion?: boolean;
  enableSnippets?: boolean;
  spellcheck?: boolean;
  useElasticTabstops?: boolean;
}

export interface IAnnotation {
  row: number;
  column: number;
  text: string;
  type: "error" | "info" | "warning";
}

interface IRenderer extends Ace.VirtualRenderer {
  placeholderNode?: HTMLDivElement;
  scroller?: HTMLDivElement;
}

export type IAceEditor = Ace.Editor & {
  renderer: IRenderer;
  [index: string]: any;
};

export type IObject = {
  [key: string]: any;
};

export interface IAceEditorProps {
  name?: string;
  vfStyle?: Partial<CSSStyleDeclaration>;
  mode?: string | IObject;
  theme?: string;
  height?: string;
  width?: string;
  className?: string;
  fontSize?: number | string;
  showGutter?: boolean;
  showPrintMargin?: boolean;
  highlightActiveLine?: boolean;
  focus?: boolean;
  cursorStart?: number;
  wrapEnabled?: boolean;
  readOnly?: boolean;
  minLines?: number;
  maxLines?: number;
  navigateToFileEnd?: boolean;
  enableBasicAutocompletion?: boolean | string[];
  enableLiveAutocompletion?: boolean | string[];
  tabSize?: number;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  scrollMargin?: number[];
  enableSnippets?: boolean;
  onSelectionChange?: (value: any, event?: any) => void;
  onCursorChange?: (value: any, event?: any) => void;
  onInput?: (event?: any) => void;
  onLoad?: (editor: Ace.Editor) => void;
  onValidate?: (annotations: Ace.Annotation[]) => void;
  onBeforeLoad?: (ace: typeof AceBuilds) => void;
  onChange?: (value: string, event?: any) => void;
  onSelection?: (selectedText: string, event?: any) => void;
  onCopy?: (value: string) => void;
  onPaste?: (value: string) => void;
  onFocus?: (event: any, editor?: Ace.Editor) => void;
  onBlur?: (event: any, editor?: Ace.Editor) => void;
  onScroll?: (editor: IEditorProps) => void;
  editorProps?: IEditorProps;
  setOptions?: IEditorOptions;
  keyboardHandler?: string;
  commands?: ICommand[];
  annotations?: Ace.Annotation[];
  markers?: IMarker[];
}
