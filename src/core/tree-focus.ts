import { App, FileExplorer, Plugin as ObsidianPlugin, PluginManifest, debounce } from 'obsidian';
import { Log } from '../util/logger';
import { FILE_EXPLORER_TYPE } from 'src/enhanced-obsidian-components/view-types';
import { PluginDataStore } from 'src/services/plugin-data-store';
import { initialSettings } from 'src/_config/initial-settings';
import { SettingsView } from 'src/views/settings-view';
import { FileExplorerHelper } from 'src/util/file-explorer-helper';
import { CssTool } from 'src/util/css-tool';
import { ModeEvaluationService } from 'src/services/mode-evaluation-service';
import { PluginSettings } from 'src/core/plugin-settings';


export class TreeFocus {

  app: App;
  plugin: ObsidianPlugin;
  manifest: PluginManifest;

  // settings: SettingsStore;
  settingsView: SettingsView;
  private refreshDebouncer: () => void;


  constructor(app: App, plugin: ObsidianPlugin, manifest: PluginManifest)
  {
    this.app = app;
    this.plugin = plugin;
    this.manifest = manifest;
  }

  async init(): Promise<void>
  {
    Log.log('initializing core');

    this.refreshDebouncer = debounce(
      () => this.refresh(),
      1000,
      true
    );

    await PluginDataStore.init(initialSettings);

    const rules = PluginSettings.get('rules');
    const fileOverwrites = PluginSettings.get('fileOverwrites');
    ModeEvaluationService.updateConfig(rules, fileOverwrites);

    this.settingsView = new SettingsView(() => this.onSettingsChanged());
  }

  requestRefresh(): void
  {
    Log.log('refresh requested');

    this.refreshDebouncer();
  }

  onSettingsChanged(): void
  {
    Log.log('settings changed');

    const rules = PluginSettings.get('rules');
    const fileOverwrites = PluginSettings.get('fileOverwrites');
    ModeEvaluationService.updateConfig(rules, fileOverwrites);

    this.requestRefresh();
  }

  private refresh(): void
  {
    Log.log('refreshing');
    
    this.removeElementChanges();
    this.addElementChanges();
  }

  private removeElementChanges(): void
  {
    Log.log('removing element changes');

    let fileExplorers = this.getFileExplorers();

    for (let fiExplorer of fileExplorers)
    {
      FileExplorerHelper.forEveryItem(fiExplorer, (path, item) =>
      {
        CssTool.removeDataAttribute(item.selfEl, 'treefocusTheme');
        CssTool.removeDataAttribute(item.selfEl, 'treefocusMode');
      });
    }

  }



  private addElementChanges(): void
  {
    Log.log('adding element changes');

    let fileExplorers = this.getFileExplorers();
    const transformPreset = PluginSettings.get('transformPreset');
    Log.debug('transform preset', transformPreset);

    for (let fiExplorer of fileExplorers)
    {
      FileExplorerHelper.forEveryItem(fiExplorer, (path, item) =>
      {
        const mode = ModeEvaluationService.evaluateMode(path, item.file.name);

        if (mode === 'DEFAULT')
        {
          return;
        }

        CssTool.applyDataAttribute(item.selfEl, 'treefocusTheme', transformPreset);
        CssTool.applyDataAttribute(item.selfEl, 'treefocusMode', mode);
      });
    }
  }

  private getFileExplorers(): FileExplorer[]
  {
    Log.debug('getting file explorers');

    let list = this.app.workspace.getLeavesOfType(FILE_EXPLORER_TYPE);

    let finalList = list.map((leaf) =>
    {
      return leaf.view as FileExplorer;
    });

    Log.debug('found file explorers', finalList);

    return finalList;
  }

  
}


