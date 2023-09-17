import { ImpactfulItemFocusModes } from './general';

type ItemTransformConfigBase = {
  underline: boolean;
  italic: boolean;
  bold: boolean;
  /**
   * Measured in factors of the default font size.
   */
  fontFactor: number;
  /**
   * A number between 0 and 1.
   */
  opacity: number;
};

export type HighlightedItemTransformConfig = ItemTransformConfigBase;
export type DimmedItemTransformConfig = ItemTransformConfigBase;


export type ItemType = 'FILE' | 'FOLDER';


export type ItemTransformConfig =
  HighlightedItemTransformConfig |
  DimmedItemTransformConfig;

export type ItemTransforms = {
  [key in ImpactfulItemFocusModes]: ItemTransformConfig;
};
