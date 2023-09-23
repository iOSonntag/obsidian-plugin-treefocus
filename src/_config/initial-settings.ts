import { SettingsObject } from 'src/core/plugin-settings';
import { Rule } from 'src/types/rules';

export const DEFAULT_RULES = (): Rule[] => [
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

export const initialSettings: SettingsObject = {
  transformPreset: 'DEFAULT',
  rules: DEFAULT_RULES(),
  fileOverwrites: {}
};