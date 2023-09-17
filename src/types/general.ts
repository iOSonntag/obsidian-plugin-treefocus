



// TODO: implement mode HIDE (requires option for showing items, first look how obsidian does it)
export type ItemFocusMode = 'DEFAULT' |  'HIGHLIGHT' | 'DIM'; // | 'HIDE';
export type ImpactfulItemFocusModes = Exclude<ItemFocusMode, 'DEFAULT'>

