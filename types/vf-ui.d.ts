import Vue from "vue";

import { VfAce } from "./ace";

// TS cannot merge imported class with namespace, so declare subclasses instead

// VfAce Component
export class Ace extends VfAce {}

/**
 * Install all vf-ui components into Vue
 * Please do not invoke this method directly
 * Call `Vue.use(VFUI)` to install
 */

export function install(vue: typeof Vue): void;
