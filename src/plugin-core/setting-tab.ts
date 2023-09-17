import { App, PluginSettingTab, Plugin as ObsidianPlugin, Setting } from 'obsidian';
import { PluginInfo } from './plugin-info';
import { PluginPresetKey } from 'src/_config/presets/plugin-presets';
import { ExcludeCustomPresetKey } from 'src/types/presets';



type PluginPreset = 'default' | 'custom' | string;

export type TreeFocusSettings = {
	preset: PluginPreset;
}

export const DEFAULT_SETTINGS: TreeFocusSettings = {
	preset: 'default'
}

export type SettingsId = 'PLUGIN_PRESET';

export type SettingsTabEvents = {
  onChange: (id: SettingsId, value: any) => void;
  valueBuilder: (id: SettingsId) => any;
};

export class SettingTab extends PluginSettingTab {

	plugin: ObsidianPlugin;
  events: SettingsTabEvents;

	constructor(app: App, plugin: ObsidianPlugin, events: SettingsTabEvents)
  {
		super(app, plugin);
    
		this.plugin = plugin;
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
				.setValue(this.events.valueBuilder('PLUGIN_PRESET'))
				.onChange(async (value) =>
        {
          this.events.onChange('PLUGIN_PRESET', value);
					// this.plugin.settings.preset = value;
					// await this.plugin.saveSettings();
				}));
	}
}
