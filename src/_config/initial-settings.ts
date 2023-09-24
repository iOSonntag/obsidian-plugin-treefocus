import { SettingsObject } from 'src/core/plugin-settings';
import { MatchingRule } from 'src/types/matching-rules';

export const DEFAULT_RULES = (): MatchingRule[] => [
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