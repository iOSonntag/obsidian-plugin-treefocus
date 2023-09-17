import { AFItem, FileExplorer } from 'obsidian';
import { ImpactfulItemFocusModes, ItemFocusMode } from '../types/general';
import { ItemTransforms, ItemType } from 'src/types/transforms';
import { PluginStrings } from 'src/plugin-core/plugin-strings';



type ModCSSProperties = Pick<CSSStyleDeclaration, |
  'fontSize' |
  'textDecoration' |
  'fontStyle' |
  'fontWeight' |
  'opacity' |

  // not in use right now
  'color' | 
  'backgroundColor'
>;

type ItemTypeStyles = {
  [key in ItemType]?: ModCSSProperties;
};




// const AllDefaultStyles: WeakMap<FileExplorer, DefaultStyles> = new WeakMap();

const AllModeStyles: WeakMap<FileExplorer, Record<ItemFocusMode, ItemTypeStyles>> = new WeakMap();

/**
 * Stores the already performed file item modifications (referenced by path) for
 * each {@link FileExplorer}. 
 */
const PerformedModifications: WeakMap<FileExplorer, Record<string, ItemFocusMode>> = new WeakMap();

const getItemType = (fileItem: AFItem): ItemType =>
{
  let fileOrFolder: any = fileItem.file;
  let isFolder = typeof fileOrFolder.children !== 'undefined' && Array.isArray(fileOrFolder.children);

  return isFolder ? 'FOLDER' : 'FILE';
}

const getCSSStyle = (explorer: FileExplorer, mode: ItemFocusMode, itemType: ItemType): ModCSSProperties | undefined =>
{
  return AllModeStyles.get(explorer)?.[mode]?.[itemType];
}

const saveCSSStyle = (explorer: FileExplorer, mode: ItemFocusMode, itemType: ItemType, style: ModCSSProperties): void =>
{
  if (!AllModeStyles.has(explorer))
  {
    AllModeStyles.set(explorer, {
      DEFAULT: {},
      HIGHLIGHT: {},
      DIM: {},
    });
  }

  if (!AllModeStyles.get(explorer)?.[mode])
  {
    AllModeStyles.get(explorer)![mode] = {};
  }

  AllModeStyles.get(explorer)![mode]![itemType] = style;
}

const styleAvailableForMode = (explorer: FileExplorer, mode: ItemFocusMode, itemType: ItemType): boolean =>
{
  return !!getCSSStyle(explorer, mode, itemType);
}

const captureStyleFromItem = (fileItem: AFItem, mode: ItemFocusMode): ModCSSProperties =>
{
  // let itemType = getItemType(fileItem);
  const computedStyle = window.getComputedStyle(fileItem.selfEl);
  const fontSize = computedStyle.getPropertyValue('font-size');

  return {
    fontSize: fontSize,
    textDecoration: fileItem.selfEl.style.textDecoration,
    fontStyle: fileItem.selfEl.style.fontStyle,
    fontWeight: fileItem.selfEl.style.fontWeight,
    opacity: fileItem.selfEl.style.opacity,
    color: fileItem.selfEl.style.color,
    backgroundColor: fileItem.selfEl.style.backgroundColor,
  };
}

const getPreviouslyAppliedMode = (fileItem: AFItem): ItemFocusMode | undefined =>
{
  let performedModifications = PerformedModifications.get(fileItem.fileExplorer);

  if (!performedModifications)
  {
    return undefined;
  }

  return performedModifications[fileItem.file.path];
}



const applyFontFactor = (fontSize: string, fontFactor: number): string =>
{
  const regex = /^(\d+)\s*(.+)$/;
  const match = fontSize.match(regex);

  if (!match)
  {
    throw new Error(`Could not parse font size: ${fontSize}. ${PluginStrings.pluginBugAppendix}`);
  }

  const number = match[1];
  const text = match[2];

  return `${(parseFloat(number) * fontFactor)}${text}`;
}

const calculateStyle = (modsConfig: ItemTransforms, itemType: ItemType, mode: ImpactfulItemFocusModes, defaultStyle: ModCSSProperties): ModCSSProperties =>
{
  let style: ModCSSProperties = Object.assign({}, defaultStyle);

  let modificationConfig = modsConfig[mode];

  if (modificationConfig.underline)
  {
    style.textDecoration = 'underline';
  }

  if (modificationConfig.italic)
  {
    style.fontStyle = 'italic';
  }

  if (modificationConfig.bold)
  {
    style.fontWeight = 'bold';
  }

  if (modificationConfig.fontFactor !== 1)
  {
    style.fontSize = applyFontFactor(defaultStyle.fontSize, modificationConfig.fontFactor);
  }

  style.opacity = modificationConfig.opacity.toString();

  return style;
}


const applyCSSStyle = (fileItem: AFItem, style: ModCSSProperties, mode: ItemFocusMode): void =>
{
  fileItem.selfEl.style.fontSize = style.fontSize;
  fileItem.selfEl.style.textDecoration = style.textDecoration;
  fileItem.selfEl.style.fontStyle = style.fontStyle;
  fileItem.selfEl.style.fontWeight = style.fontWeight;
  fileItem.selfEl.style.opacity = style.opacity;
  fileItem.selfEl.style.color = style.color;
  fileItem.selfEl.style.backgroundColor = style.backgroundColor;

  if (!PerformedModifications.has(fileItem.fileExplorer))
  {
    PerformedModifications.set(fileItem.fileExplorer, {});
  }

  let performedModifications = PerformedModifications.get(fileItem.fileExplorer);

  if (!performedModifications)
  {
    throw new Error(`Trying to apply style to a file explorer item but the map for storing the performed modifications is null or undefined. ${PluginStrings.pluginBugAppendix}`);
  }

  performedModifications[fileItem.file.path] = mode;
}


const resetAllDOMStyleChangesForExplorer = (explorer: FileExplorer): void =>
{
  if (!PerformedModifications.has(explorer))
  {
    return;
  }

  let performedModifications = PerformedModifications.get(explorer);

  if (!performedModifications)
  {
    return;
  }

  let folderStyle = getCSSStyle(explorer, 'DEFAULT', 'FOLDER');
  let fileStyle = getCSSStyle(explorer, 'DEFAULT', 'FILE');
  let pathKeys = Object.keys(performedModifications);

  for (let fiFilePath of pathKeys)
  {
    let mode = performedModifications[fiFilePath];

    if (mode === 'DEFAULT')
    {
      continue;
    }

    let fileItem = explorer.fileItems[fiFilePath];

    if (!fileItem)
    {
      // file was removed
      delete performedModifications[fiFilePath];
      continue;
    }

    let itemType = getItemType(fileItem);
    let style = null;
    
    switch (itemType)
    {
      case 'FOLDER':
        style = folderStyle;
        break;
      case 'FILE':
        style = fileStyle;
        break;
    }

    if (!style)
    {
      throw new Error(`Trying to reset style changes for a file explorer item but no default style is available. ${PluginStrings.pluginBugAppendix}`);
    }

    applyCSSStyle(fileItem, style, 'DEFAULT');
    performedModifications[fiFilePath] = 'DEFAULT';
  }
}

export const resetAllDOMStyleChanges = (fileExplorers: FileExplorer[]): void =>
{
  for (let fiExplorer of fileExplorers)
  {
    resetAllDOMStyleChangesForExplorer(fiExplorer);
  }
}

export const applyStyleIfNeeded = (modsConfig: ItemTransforms, fileItem: AFItem, mode: ItemFocusMode): void =>
{
  let previouslyAppliedMode = getPreviouslyAppliedMode(fileItem);

  if (previouslyAppliedMode === mode)
  {
    return;
  }

  let itemType = getItemType(fileItem);

  if (!previouslyAppliedMode || previouslyAppliedMode === 'DEFAULT')
  {
    if (styleAvailableForMode(fileItem.fileExplorer, 'DEFAULT', itemType) === false)
    {
      saveCSSStyle(fileItem.fileExplorer, 'DEFAULT', itemType, captureStyleFromItem(fileItem, 'DEFAULT'));
    }
  }

  let style = getCSSStyle(fileItem.fileExplorer, mode, itemType);

  if (!style)
  {
    if (mode === 'DEFAULT')
    {
      throw new Error(`Trying to apply default style to a file explorer item but no default style is available. ${PluginStrings.pluginBugAppendix}`);
    }


    let defaultStyle = getCSSStyle(fileItem.fileExplorer, 'DEFAULT', itemType);

    if (!defaultStyle)
    {
      throw new Error(`Trying to apply style to a file explorer item but no default style is available. ${PluginStrings.pluginBugAppendix}`);
    }

    style = calculateStyle(modsConfig, itemType, mode, defaultStyle);

    saveCSSStyle(fileItem.fileExplorer, mode, itemType, style);
  }

  applyCSSStyle(fileItem, style, mode);

}











