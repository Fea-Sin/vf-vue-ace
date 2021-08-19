import { IObject, IEditorProps } from "./ace";

export interface IDiffEditorProps {
  cursorStart?: number;
  editorProps?: IObject;
  enableBasicAutocompletion?: boolean | string[];
  enableLiveAutocompletion?: boolean | string[];
  focus?: boolean;
  fontSize?: number;
  height?: string;
  width?: string;
  highlightActiveLine?: boolean;
  maxLines?: number;
  minLines?: number;
  mode?: string;
  name?: string;
  className?: string;
  onLoad?: (editor: IEditorProps) => void;
  onChange?: (value: string[], event?: any) => void;
  onPaste?: (value: string) => void;
  onScroll?: (editor: string) => void;
  orientation?: string;
  readonly?: boolean;
  scrollMargin?: number[];
  setOptions?: IObject;
  showGutter?: boolean;
  showPrintMargin?: boolean;
  splits?: number;
  vfStyle?: Partial<CSSStyleDeclaration>;
  tabSize?: number;
  theme?: string;
  value?: string[];
  wrapEnabled?: boolean;
}
