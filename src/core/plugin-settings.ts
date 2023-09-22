
import { PluginDataStore } from 'src/services/plugin-data-store';
import { RulesHelper } from 'src/util/rules-helper';
import { FilesFocusModeMap, Rule } from 'src/types/rules';


export type TransformPresetKey = 'DEFAULT' | 'FANCY' | 'DELIGHT';

export type SettingsObject = {
  transformPreset: TransformPresetKey;
  rules: Rule[];
  fileOverwrites: FilesFocusModeMap;
};

export const DEFAULT_RULES: Rule[] = [
  {
    matcher: {
      method: 'STARTS_WITH',
      value: '_',
      context: 'NAME',
    },
    mode: 'DIM',
    excludes: []
  },
  {
    matcher: {
      method: 'STARTS_WITH',
      value: '.',
      context: 'NAME',
    },
    mode: 'DIM',
    excludes: []
  },
  {
    matcher: {
      method: 'STARTS_WITH',
      value: '!',
      context: 'NAME',
    },
    mode: 'HIGHLIGHT',
    excludes: []
  }
];

export type SettingsObjectKey = keyof SettingsObject;


export abstract class PluginSettings {


  static getAll(): SettingsObject
  {
    return PluginDataStore.getAll() as SettingsObject;
  }

  static get<T extends SettingsObjectKey>(key: T): SettingsObject[T]
  {
    return PluginDataStore.get(key) as SettingsObject[T];
  }

  static async set<T extends SettingsObjectKey>(key: T, value: SettingsObject[T]): Promise<void>
  {
    await PluginDataStore.set(key, value);
  }

  static async resetRules(): Promise<void>
  {
    await PluginSettings.set('rules', DEFAULT_RULES);
  }

}