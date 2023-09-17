
import { App, Plugin as ObsidianPlugin } from 'obsidian';
import { initialSettings } from 'src/_config/initial-settings';
import { PLUGIN_PRESETS, PluginPresetKey } from 'src/_config/presets/plugin-presets';
import { ItemTransforms } from 'src/types/transforms';
import { FilesFocusModeMap, Rule } from 'src/types/rules';
import { Log } from 'src/util/logger';
import { SettingsId, SettingsTabEvents } from 'src/plugin-core/setting-tab';
import { ErrorHelper } from 'src/util/error-helper';



export type PluginsSettings = {
  preset: PluginPresetKey;
  rules: Rule[];
  fileOverwrites: FilesFocusModeMap;
  transforms: ItemTransforms;
};



export class SettingsStore {

  app: App;
  plugin: ObsidianPlugin;
  tabEvents: SettingsTabEvents;
  onReload: () => void;

  private settings: PluginsSettings;

	constructor(app: App, plugin: ObsidianPlugin, onReload: () => void)
  {
		this.plugin = plugin;
    this.app = app;
    this.onReload = onReload;
    this.tabEvents = {
      onChange: this.onChange.bind(this),
      valueBuilder: this.valueBuilder.bind(this)
    };
	}

  private onChange(id: SettingsId, value: any)
  {
    Log.log(`settings changed: ${id} = ${value}`);

    switch (id)
    {
      case 'PLUGIN_PRESET':
        this.settings.preset = value;
        break;
    }

    this.save();
  }

  private valueBuilder(id: SettingsId): any
  {
    switch (id)
    {
      case 'PLUGIN_PRESET':
        return this.settings.preset;
    }

    throw ErrorHelper.pluginBug(`Unknown settings id: ${id} - (migration needed?)`);
  }

  /**
   * Loads the settings for this plugin by merging the initial settings with the
   * current user settings if any.
   */
  async load()
  {
    Log.log('loading settings');

    let userData = await this.plugin.loadData();
    this.settings = Object.assign({}, initialSettings, userData);
  }

  /**
   * Saves the current settings to the user's vault.
   */
	async save()
  {
    Log.log('saving settings');

		await this.plugin.saveData(this.settings);
    this.onReload();
	}

  get rules(): Rule[]
  {
    if (this.settings.preset !== 'CUSTOM')
    {
      return PLUGIN_PRESETS[this.settings.preset].rules;
    }

    return this.settings.rules;
  }

  get fileOverwrites(): FilesFocusModeMap
  {
    return this.settings.fileOverwrites;
  }

  get transforms(): ItemTransforms
  {
    if (this.settings.preset !== 'CUSTOM')
    {
      return PLUGIN_PRESETS[this.settings.preset].transforms;
    }

    return this.settings.transforms;
  }

}