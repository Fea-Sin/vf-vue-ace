import { Ace } from "ace-builds";

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
