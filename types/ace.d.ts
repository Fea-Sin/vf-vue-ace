import { VFUIComponent } from "./component";
import { Ace } from "ace-builds";
import * as AceBuilds from "ace-builds";

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
export interface IEditorOptions {
  useWorker: boolean;
  showLineNumbers: boolean;
  tabSize: number;
}
export interface ICommandBindKey {
  win: string;
  mac: string;
}
export interface ICommand {
  name: string;
  bindKey: ICommandBindKey;
  exec: string | ICommandExecFunction;
}
type ICommandExecFunction = (editor: Ace.Editor, args?: any) => void;
export type IObject = {
  [key: string]: any;
};

// VfAce Component
export declare class VfAce extends VFUIComponent {
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
