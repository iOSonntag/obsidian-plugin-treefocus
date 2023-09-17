import { PluginPreset, PresetBaseKeys, ExcludeCustomPresetKey } from 'src/types/presets';

export type PluginPresetKey = PresetBaseKeys | 'FANCY';

type PluginPresets = {
  [key in ExcludeCustomPresetKey<PluginPresetKey>]: PluginPreset;
}

export const PLUGIN_PRESETS: PluginPresets = {
  DEFAULT: {
    rules: [
      {
        mather: {
          method: 'REGEX',
          regex: '^[!].*',
          fullPath: false
        },
        mode: 'HIGHLIGHT',
        excludes: []
      },
      {
        mather: {
          method: 'REGEX',
          regex: '^[_].*',
          fullPath: false
        },
        mode: 'DIM',
        excludes: []
      }
    ],
    files: {},
    transforms: {
      HIGHLIGHT: {
        underline: true,
        italic: false,
        bold: true,
        opacity: 1,
        fontFactor: 1.2
      },
      DIM: {
        underline: false,
        italic: false,
        bold: false,
        opacity: 0.3,
        fontFactor: 0.8
      }
    },
  },
  FANCY: {
    rules: [
      {
        mather: {
          method: 'REGEX',
          regex: '^[!].*',
          fullPath: false
        },
        mode: 'HIGHLIGHT',
        excludes: []
      },
      {
        mather: {
          method: 'REGEX',
          regex: '^[_].*',
          fullPath: false
        },
        mode: 'DIM',
        excludes: []
      }
    ],
    files: {},
    transforms: {
      HIGHLIGHT: {
        underline: false,
        italic: true,
        bold: true,
        opacity: 1,
        fontFactor: 2
      },
      DIM: {
        underline: false,
        italic: false,
        bold: false,
        opacity: 0.2,
        fontFactor: 0.4
      }
    },
  }
};
