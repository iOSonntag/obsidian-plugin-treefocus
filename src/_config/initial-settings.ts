import { DEFAULT_RULES, SettingsObject } from 'src/core/plugin-settings';


export const initialSettings: SettingsObject = {
  transformPreset: 'DEFAULT',
  rules: DEFAULT_RULES,
  fileOverwrites: {}
};