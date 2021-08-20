import { IObject, IEditorProps } from "./ace";
import { VFUIComponent } from "./component";

declare module "diff-match-patch";

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
  onScroll?: (editor: IEditorProps) => void;
  orientation?: string;
  readOnly?: boolean;
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

export declare class VfDiff extends VFUIComponent {
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
  onScroll?: (editor: IEditorProps) => void;
  orientation?: string;
  readOnly?: boolean;
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
