import { ItemTransforms } from './transforms';
import { FilesFocusModeMap, Rule } from './rules';


export type PresetKeyCustom = 'CUSTOM';
export type PresetKeyDefault = 'DEFAULT';

export type PresetBaseKeys = PresetKeyCustom | PresetKeyDefault;

export type ExcludeCustomPresetKey<T> = Exclude<T, PresetKeyCustom>;


export type PluginPreset = {
  rules: Rule[];
  files: FilesFocusModeMap;
  transforms: ItemTransforms;
}


