
import { PluginDataStore } from 'src/services/plugin-data-store';
import { RulesHelper } from 'src/util/rules-helper';
import { FilesFocusModeMap, MatchingRule } from 'src/types/matching-rules';
import { ItemFocusMode } from 'src/types/general';
import { DEFAULT_RULES } from 'src/_config/initial-settings';


export type TransformPresetKey = 'DEFAULT' | 'FANCY' | 'DELIGHT';

export type SettingsObject = {
  transformPreset: TransformPresetKey;
  rules: MatchingRule[];
  fileOverwrites: FilesFocusModeMap;
};



export type SettingsObjectKey = keyof SettingsObject;


export abstract class PluginSettings {

  /**
   * Returns the entire settings object. 
   **/
  static getAll(): SettingsObject
  {
    return PluginDataStore.getAll() as SettingsObject;
  }

  /**
   * Returns a setting value by key.
   */
  static get<T extends SettingsObjectKey>(key: T): SettingsObject[T]
  {
    return PluginDataStore.get(key) as SettingsObject[T];
  }

  /**
   * Sets a setting value by key.
   */
  static async set<T extends SettingsObjectKey>(key: T, value: SettingsObject[T]): Promise<void>
  {
    await PluginDataStore.set(key, value);
  }

  /**
   * Returns the configured matching rules, sorted by priority.
   */
  static getMatchingRules(): MatchingRule[]
  {
    return PluginSettings.get('rules');
  }

  /**
   * Resets the matching rules to the default rules.
   */
  static async resetMatchingRules(): Promise<void>
  {
    await PluginSettings.set('rules', DEFAULT_RULES());
  }

  /**
   * Returns the explicit {@link ItemFocusMode} set for the given file path if any.
   */
  static getExplicitMode(path: string): ItemFocusMode | undefined
  {
    const files = PluginSettings.get('fileOverwrites');

    return files[path];
  }

  /**
   * Returns all file paths that have an explicit {@link ItemFocusMode} set.
   */
  static getExplicitModePaths(): string[]
  {
    const files = PluginSettings.get('fileOverwrites');

    return Object.keys(files);
  }

  /**
   * Sets the explicit {@link ItemFocusMode} for the given file path.
   */
  static async setExplicitMode(path: string, mode: ItemFocusMode): Promise<void>
  {
    const files = PluginSettings.get('fileOverwrites');

    files[path] = mode;

    await PluginSettings.set('fileOverwrites', files);
  }

  /**
   * Removes the explicit {@link ItemFocusMode} for the given file path.
   */ 
  static async removeExplicitMode(path: string): Promise<void>
  {
    const files = PluginSettings.get('fileOverwrites');

    delete files[path];

    await PluginSettings.set('fileOverwrites', files);
  }

}