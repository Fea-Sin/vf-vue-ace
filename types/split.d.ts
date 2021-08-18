import { Ace } from "ace-builds";
import { IEditorProps, IEditorOptions, ICommand, IMarker } from "./ace";

declare module "lodash.isequal";

export interface ISplitEditorProps {
  name?: string;
  vfStyle?: Partial<CSSStyleDeclaration>;
  mode?: string;
  theme?: string;
  height?: string;
  width?: string;
  className?: string;
  fontSize?: number | string;
  showGutter?: boolean;
  showPrintMargin?: boolean;
  highlightActiveLine?: boolean;
  focus?: boolean;
  splits: number;
  cursorStart?: number;
  wrapEnabled?: boolean;
  readOnly?: boolean;
  minLines?: number;
  maxLines?: number;
  enableBasicAutocompletion?: boolean | string[];
  enableLiveAutocompletion?: boolean | string[];
  tabSize?: number;
  value?: string;
  defaultValue?: string[];
  scrollMargin?: number[];
  orientation?: string;
  onSelectionChange?: (value: any, event?: any) => void;
  onCursorChange?: (value: any, event?: any) => void;
  onInput?: (event?: any) => void;
  onLoad?: (editor: Ace.Editor) => void;
  onBeforeLoad?: (ace: any) => void;
  onChange?: (value: string[], event?: any) => void;
  onSelection?: (selectedText: string, event?: any) => void;
  onCopy?: (value: string) => void;
  onPaste?: (value: string) => void;
  onFocus?: (value: Event) => void;
  onBlur?: (value: Event) => void;
  onScroll?: (editor: IEditorProps) => void;
  editorProps?: IEditorProps;
  setOptions?: IEditorOptions;
  keyboardHandler?: string;
  commands?: ICommand[];
  annotations?: Ace.Annotation[][];
  markers?: IMarker[][];
}

export type IOrientation = "beside" | "below";
