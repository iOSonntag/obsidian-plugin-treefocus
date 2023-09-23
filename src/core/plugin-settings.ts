
import { PluginDataStore } from 'src/services/plugin-data-store';
import { RulesHelper } from 'src/util/rules-helper';
import { FilesFocusModeMap, Rule } from 'src/types/rules';
import { ItemFocusMode } from 'src/types/general';
import { DEFAULT_RULES } from 'src/_config/initial-settings';


export type TransformPresetKey = 'DEFAULT' | 'FANCY' | 'DELIGHT';

export type SettingsObject = {
  transformPreset: TransformPresetKey;
  rules: Rule[];
  fileOverwrites: FilesFocusModeMap;
};



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
    await PluginSettings.set('rules', DEFAULT_RULES());
  }


  static async setExplicitMode(path: string, mode: ItemFocusMode): Promise<void>
  {
    const files = PluginSettings.get('fileOverwrites');

    files[path] = mode;

    await PluginSettings.set('fileOverwrites', files);
  }

  static async removeExplicitMode(path: string): Promise<void>
  {
    const files = PluginSettings.get('fileOverwrites');

    delete files[path];

    await PluginSettings.set('fileOverwrites', files);
  }

}