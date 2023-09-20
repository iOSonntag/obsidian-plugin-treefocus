import { App, PluginSettingTab, Plugin as ObsidianPlugin, Setting } from 'obsidian';
import { PluginInfo } from './plugin-info';
import { PluginPresetKey } from 'src/_config/presets/plugin-presets';
import { ExcludeCustomPresetKey } from 'src/types/presets';



export type SettingIds = string;

export type TreeFocusSettings = {
	preset: PluginPreset;
}

export const DEFAULT_SETTINGS: TreeFocusSettings = {
	preset: 'default'
}

export type SettingsId = 'PLUGIN_PRESET';

export type SettingsTabEvents<T extends SettingIds> = {
  onChangeSetting: <T>(id: T, value: any) => void;
  getCurrentSetting: <T>(id: T) => any;
};

export class SettingTab<T extends SettingIds> extends PluginSettingTab {

  events: SettingsTabEvents<T>;

	constructor(app: App, plugin: ObsidianPlugin, events: SettingsTabEvents<T>)
  {
		super(app, plugin);
    
    this.events = events;
	}

	display(): void
  {
		const { containerEl } = this;

		containerEl.empty();

    containerEl.createEl('h2', { 
      text: `${PluginInfo.pluginName} Settings` 
    });

    let options: {
      [key in ExcludeCustomPresetKey<PluginPresetKey>]: string;
    } = {
      'DEFAULT': 'Default',
      'FANCY': 'Fancy',
    };

		new Setting(containerEl)
			.setName('Preset')
			.setDesc('The preset to use for the plugin. The option \'Customize\' is available soon')
      .addDropdown(dropdown => dropdown
        .addOptions(options)
				// .setPlaceholder('Enter your secret')
				.setValue(this.events.getCurrentSetting('PLUGIN_PRESET'))
				.onChange(async (value) =>
        {
          this.events.onChangeSetting('PLUGIN_PRESET', value);
					// this.plugin.settings.preset = value;
					// await this.plugin.saveSettings();
				}));
	}
}
