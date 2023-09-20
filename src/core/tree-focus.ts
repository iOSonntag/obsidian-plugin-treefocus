import { AFItem, App, FileExplorer, Plugin as ObsidianPlugin, PluginManifest, debounce } from 'obsidian';
import { determinateFocusMode } from '../services/mode-determination-service';
import { applyStyleIfNeeded, resetAllDOMStyleChanges } from '../services/dom-style-service';
import { Log } from '../util/logger';
import { SettingsStore } from './settings-store';
import { SettingTab } from 'src/plugin-core/setting-tab';
import { FILE_EXPLORER_TYPE } from 'src/obsidian/view-types';
import { PluginDataStore } from 'src/services/plugin-data-store';
import { initialSettings } from 'src/_config/initial-settings';


export class TreeFocus {

  app: App;
  plugin: ObsidianPlugin;
  manifest: PluginManifest;

  settings: SettingsStore;
  settingsTab: SettingTab;

  constructor(app: App, plugin: ObsidianPlugin, manifest: PluginManifest)
  {
    this.app = app;
    this.plugin = plugin;
    this.manifest = manifest;
  }

  async init(): Promise<void>
  {
    Log.log('initializing core');

    await PluginDataStore.init(initialSettings);

    this.settings = new SettingsStore(this.app, this.plugin, this.applyAllStyles.bind(this));
    await this.settings.load();


    this.settingsTab = new SettingTab(this.app, this.plugin, {
      onChangeSetting: (id, value) => {},
      getCurrentSetting: (id) => {},
    });
  }

  
  applyAllStyles = debounce(
    () => this.applyAllStylesDebounced(),
    1000,
    true
  ).bind(this);

  applyStyleOnItem = debounce(
    (item: AFItem) => this.applyStyleOnItemDebounced(item),
    200,
    true
  );

  private applyStyleOnItemDebounced(item: AFItem)
  {
    this.updateItemIfNeeded(item);
  }

  private applyAllStylesDebounced()
  {
    Log.log('applying styles');

    let explorers = this.getFileExplorers();
    this.resetAllModifications(explorers);
    let items = this.getAllFileItemsFromExplorers();

    items.forEach((item) =>
    {
      this.updateItemIfNeeded(item);
    });
  }

  private getFileExplorers(): FileExplorer[]
  {
    Log.log('getting file explorers');

    let list = this.app.workspace.getLeavesOfType(FILE_EXPLORER_TYPE);

    let finalList = list.map((leaf) =>
    {
      return leaf.view as FileExplorer;
    });

    Log.log('found file explorers', finalList);

    return finalList;
  }

  /**
   * If no explorers are provided, a new list of all explorers will be fetched.
   */
  private getAllFileItemsFromExplorers(explorers?: FileExplorer[]): AFItem[]
  {
    Log.log('getting all file items from all explorers');

    explorers = explorers ?? this.getFileExplorers();

    let items: AFItem[] = [];

    explorers.forEach((explorer) =>
    {
      if (!explorer.ready)
      {
        Log.warn('found a file explorer that is not ready yet (might be critical)', explorer);
      }

      items.push(...Object.values(explorer.fileItems));
    });

    return items;
  }



  public updateItemIfNeeded(item: AFItem): void
  {
    let mode = determinateFocusMode(item, this.settings.rules, this.settings.fileOverwrites);

    applyStyleIfNeeded(this.settings.transforms, item, mode)
  }

  // TODO: refactor
  public resetAllModifications(explorers: FileExplorer[]): void
  {
    resetAllDOMStyleChanges(explorers);
  }
}


