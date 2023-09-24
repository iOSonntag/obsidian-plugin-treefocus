import { PluginInfo } from '../core/plugin-info';
import { Bundle } from 'src/core/plugin-bundle';
import { ObsidianSettingsTab, SettingsContext } from 'src/enhanced-obsidian-components/obsidian-settings-tab';
import { PluginSettings, TransformPresetKey } from 'src/core/plugin-settings';
import { FilesFocusModeMap, MatchContext, MatchMethod, MatchingRule } from 'src/types/matching-rules';
import { RulesHelper } from 'src/util/rules-helper';
import { ImpactfulItemFocusModes, ItemFocusMode } from 'src/types/general';
import { Log } from 'src/util/logger';



const presetOptions: Record<TransformPresetKey, string> = {
  'DEFAULT': 'Default',
  'FANCY': 'Fancy',
  'DELIGHT': 'Delight',
};

const matcherMethodOptions: Record<MatchMethod, string> = {
  'EQUALS': 'equals',
  'STARTS_WITH': 'starts with',
  'ENDS_WITH': 'ends with',
  'CONTAINS': 'contains',
  'REGEX': 'matches regex',
};

const focusModeOptions: Record<ImpactfulItemFocusModes, string> = {
  'DIM': 'Dim',
  'HIGHLIGHT': 'Highlight',
  // 'HIDE': 'Hide',
};

const matchContextOptions: Record<MatchContext, string> = {
  'NAME': 'if name',
  'PATH': 'if path',
};

export class SettingsView extends ObsidianSettingsTab {
  
  onUpdateSettings: () => void;

	constructor(onUpdateSettings: () => void)
  {
		super(Bundle.app, Bundle.plugin);

    this.onUpdateSettings = onUpdateSettings;
	}

  didUpdateSettings(): void
  {
    Log.debug('didUpdateSettings');

    this.onUpdateSettings();
  }

  build(context: SettingsContext): void
  {
    context.createSectionHeader('Transformation Style');

    context.createSetting()
			.setName('Preset')
			.setDesc('Controls the style of the applied rules. More presets might be added in the future.')
      .addDropdown(dropdown => dropdown
        .addOptions(presetOptions)
				.setValue(PluginSettings.get('transformPreset'))
				.onChange(async (value) =>
        {
          await PluginSettings.set('transformPreset', value as TransformPresetKey);
          context.applySettings();
				}));

    context.createSectionDivider();
    context.createSectionHeader('Transformation Rules', 'Define a set of rules that transform items (files and folders) in the file explorer.\n\nRules are checked in the order they are defined. The first rule that matches an item will be applied.\nIf an item has an explicit transformation set, rules are disabled for that item.');

    context.createSetting()
      .setHeading()
      .setName('Rules')
      .addButton(button => button
        .setCta()
        .setButtonText('Reset to Defaults')
        .onClick(async () =>
        {
          await PluginSettings.resetMatchingRules();
          context.applySettings();
        }))
      .addButton(button => button
        .setButtonText('Add Rule')
        .onClick(async () =>
        {
          const rule = RulesHelper.createRule();
          const rules = PluginSettings.get('rules');
          rules.push(rule);
          await PluginSettings.set('rules', rules);
          context.applySettings();
        }));


    const rules = PluginSettings.get('rules');

    for (let i = 0; i < rules.length; i++)
    {
      this.createRule(context, rules, i);
    }

    
    context.createSectionDivider();
    context.createSectionHeader('Explicit Transformations', 'Items with explicit transformation configuration. To add an item, right click it in the file explorer and select "Set Treefocus".');


    const fileOverwrites = PluginSettings.get('fileOverwrites');
    const keys = Object.keys(fileOverwrites).sort();

    for (let i = 0; i < keys.length; i++)
    {


      const key = keys[i];
      this.createFileOverwrite(context, fileOverwrites, key);
    }


    context.createSectionDivider();
    context.createSectionHeader('Support This Plugin', 'If you like this plugin and want to support it - submit a feature request, a pull request or simply buy me a little coffee :) - Thank You.');

    context.createSupportLinks('iOSonntag', 'https://paypal.com/paypalme/iOSonntag/20');
  }

  createRule(context: SettingsContext, rules: MatchingRule[], index: number): void
  {
    const rule = rules[index];

    if (!rule) return;


    const setting = context.createSetting()
      .setName(`#${index + 1}`)
      .addDropdown(dropdown => dropdown
        .addOptions(focusModeOptions)
        .setValue(rule.mode)
        
        .onChange(async (value) =>
        {
          rule.mode = value as ItemFocusMode;
          await PluginSettings.set('rules', rules);
          context.applySettings();
        })
      )
      .addDropdown(dropdown => dropdown
        .addOptions(matchContextOptions)
        .setValue(rule.matcher.context)
        .onChange(async (value) =>
        {
          rule.matcher.context = value as MatchContext;
          await PluginSettings.set('rules', rules);
          context.applySettings();
        }
      )
    ).addDropdown(dropdown => dropdown
      .addOptions(matcherMethodOptions)
      .setValue(rule.matcher.method)
      .onChange(async (value) =>
      {
        rule.matcher.method = value as MatchMethod;
        await PluginSettings.set('rules', rules);
        context.applySettings();
      }
    )
  ).addText(text => text
      .setPlaceholder('Enter a value...')
      .setValue(rule.matcher.value)
      .onChange(async (value) =>
      {
        rule.matcher.value = value;
        await PluginSettings.set('rules', rules);
        context.applySettings();
      })
    );



    setting.addExtraButton(button => button
      .setIcon('chevron-up')
      .setTooltip('Move rule up')
      .setDisabled(index === 0)
      .onClick(async () =>
      {
        const temp = rules[index - 1];
        rules[index - 1] = rule;
        rules[index] = temp;
        
        await PluginSettings.set('rules', rules);
        context.applySettings();
      })
    ).addExtraButton(button => button
      .setIcon('chevron-down')
      .setTooltip('Move rule down')
      .setDisabled(index === rules.length - 1)
      .onClick(async () =>
      {
        const temp = rules[index + 1];
        rules[index + 1] = rule;
        rules[index] = temp;
        
        await PluginSettings.set('rules', rules);
        context.applySettings();
      })
    ).addExtraButton(button => button
      .setIcon('trash')
      .setTooltip('Delete Rule')
      .onClick(async () =>
      {
        rules.splice(index, 1);
        await PluginSettings.set('rules', rules);
        context.applySettings();
      })
    )
  }

  createFileOverwrite(context: SettingsContext, fileOverwrites: FilesFocusModeMap, key: string): void
  {
    const rule = fileOverwrites[key];

    if (!rule)
    {
      return;
    }

    context.createSetting()
      .setName(key)
      .setDesc(rule)
      .addExtraButton(button => button
        .setIcon('trash')
        .setTooltip('Remove Explicit Transformation')
        .onClick(async () =>
        {
          delete fileOverwrites[key];
          await PluginSettings.set('fileOverwrites', fileOverwrites);
          context.applySettings();
        })
      )
  }

}
