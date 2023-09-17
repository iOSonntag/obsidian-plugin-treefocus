import { PluginsSettings as PluginSettings } from 'src/core/settings-store';


export const initialSettings: PluginSettings = {
  preset: 'DEFAULT',
  rules: [],
  fileOverwrites: {},
  transforms: {
    HIGHLIGHT: {
      underline: false,
      italic: false,
      bold: false,
      fontFactor: 0,
      opacity: 0
    },
    DIM: {
      underline: false,
      italic: false,
      bold: false,
      fontFactor: 0,
      opacity: 0
    }
  },
};