import Vue from "vue";

import { VfAce } from "./ace";
import { VfSplit } from "./split";
import { VfDiff } from "./diff";

// TS cannot merge imported class with namespace, so declare subclasses instead

// VfAce Component
export class Ace extends VfAce {}

// VfSplit Component
export class Split extends VfSplit {}

// VfDiff Component

export class Diff extends VfDiff {}

/**
 * Install all vf-ui components into Vue
 * Please do not invoke this method directly
 * Call `Vue.use(VFUI)` to install
 */

export function install(vue: typeof Vue): void;
