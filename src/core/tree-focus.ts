import { App, FileExplorer, Menu, MenuItem, Plugin as ObsidianPlugin, PluginManifest, TAbstractFile, debounce } from 'obsidian';
import { Log } from '../util/logger';
import { VIEW_TYPE_FILE_EXPLORER } from 'src/enhanced-obsidian-components/known-type-keys';
import { PluginDataStore } from 'src/services/plugin-data-store';
import { initialSettings } from 'src/_config/initial-settings';
import { SettingsView } from 'src/views/settings-view';
import { FileExplorerHelper } from 'src/util/file-explorer-helper';
import { CssTool } from 'src/util/css-tool';
import { ModeEvaluationService } from 'src/services/mode-evaluation-service';
import { PluginSettings } from 'src/core/plugin-settings';
import { ErrorHelper } from 'src/util/error-helper';


export class TreeFocus {

  app: App;
  plugin: ObsidianPlugin;
  manifest: PluginManifest;

  // settings: SettingsStore;
  private settingsView?: SettingsView;
  private refreshDebouncer?: () => void;

  getSettingsView(): SettingsView
  {
    if (!this.settingsView)
    {
      throw ErrorHelper.pluginBug('settingsView is not set');
    }

    return this.settingsView;
  }

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
      50,
      true
    );

    await PluginDataStore.init(initialSettings);


    this.settingsView = new SettingsView(() => this.onSettingsChanged());
  }

  onOpenFileExplorerContextMenu(menu: Menu, file: TAbstractFile): void
  {
    Log.debug('open file explorer context menu', menu, file);

    menu.addSeparator();

    const explicitMode = PluginSettings.getExplicitMode(file.path);


    const itemHeadline= (item: MenuItem) => {
      item.setTitle('TreeFocus');
      item.setDisabled(true);
    };

    const highlighted = explicitMode === 'HIGHLIGHT';
    const itemHighlight = (item: MenuItem) => {
      item.setTitle('Highlight');
      item.setChecked(highlighted);
      item.onClick(async () =>
      {
        if (highlighted)
        {
          await PluginSettings.removeExplicitMode(file.path);
        }
        else
        {
          await PluginSettings.setExplicitMode(file.path, 'HIGHLIGHT');
        }

        this.requestRefresh();
      });
    };


    const dimmed = explicitMode === 'DIM';
    const itemDim = (item: MenuItem) => {
      item.setTitle('Dim');
      item.setChecked(dimmed);
      item.onClick(async () =>
      {
        if (dimmed)
        {
          await PluginSettings.removeExplicitMode(file.path);
        }
        else
        {
          await PluginSettings.setExplicitMode(file.path, 'DIM');
        }
        this.requestRefresh();
      });
    };

    const explicitDefault = explicitMode === 'DEFAULT';
    const itemExplicitDefault = (item: MenuItem) => {
      item.setTitle('Default (rule overwrite)');
      item.setChecked(explicitDefault);
      item.onClick(async () =>
      {
        if (explicitDefault)
        {
          await PluginSettings.removeExplicitMode(file.path);
        }
        else
        {
          await PluginSettings.setExplicitMode(file.path, 'DEFAULT');
        }
        this.requestRefresh();
      });
    };

    const itemReset = (item: MenuItem) => {
      item.setTitle('Reset...');
      item.setDisabled(explicitMode === undefined);
      item.onClick(async () =>
      {
        await PluginSettings.removeExplicitMode(file.path);
        this.requestRefresh();
      });
    };

    menu.addItem(itemHeadline);
    menu.addItem(itemHighlight);
    menu.addItem(itemDim);
    menu.addItem(itemExplicitDefault);
    menu.addItem(itemReset);
    
  }

  /**
   * Use this method to request the first run of changes made to obsidian by the
   * tree focus plugin.
   */
  requestInitialRefresh(): void
  {
    Log.log('initial refresh requested');

    setTimeout(() =>
    {
      this.performPluginCleanupTask();
    }, 500);


    this.requestRefresh();
  }

  /**
   * Use this method to clean the plugin. Currently this method does the
   * following:
   * 
   * - checks for orphaned explicit file modes stored and removes them.
   */
  private async performPluginCleanupTask(): Promise<void>
  {
    const allItemPaths: string[] = [];
    let fileExplorers = this.getFileExplorers();

    for (let fiExplorer of fileExplorers)
    {
      FileExplorerHelper.forEveryItem(fiExplorer, (path, item) =>
      {
        allItemPaths.push(path);
      });
    }

    const availableExplicitPaths = [...PluginSettings.getExplicitModePaths()];
    const orphanedExplicitPaths = availableExplicitPaths.filter((path) => allItemPaths.includes(path) === false);
    
    Log.debug('orphaned explicit paths', orphanedExplicitPaths);

    for (const orphanedPath of orphanedExplicitPaths)
    {
      await PluginSettings.removeExplicitMode(orphanedPath);
    }
  }

  /**
   * Use this method to request a refresh of the changes made to obsidian by the
   * tree focus plugin.
   */
  requestRefresh(): void
  {
    Log.log('refresh requested');

    if (!this.refreshDebouncer)
    {
      throw ErrorHelper.pluginBug('refreshDebouncer is not set');
    } 
    
    this.refreshDebouncer();
  }

  /**
   * Fired when a file has been renamed / moved.
   */
  onFileMoved(newPath: string, oldPath: string): void
  {
    Log.debug('file moved', 'newPath', newPath, 'oldPath', oldPath);

    const explicitMode = PluginSettings.getExplicitMode(oldPath);

    if (explicitMode)
    {
      PluginSettings.setExplicitMode(newPath, explicitMode);
      PluginSettings.removeExplicitMode(oldPath);
    }

    this.requestRefresh();
  }

   /**
   * Fired when a file has been deleted.
   */
   onFileDeleted(path: string): void
   {
     Log.debug('file deleted', path);
 
     const explicitMode = PluginSettings.getExplicitMode(path);
 
     if (explicitMode)
     {
       PluginSettings.removeExplicitMode(path);
     }
 
     this.requestRefresh();
   }


  /**
   * Fired when the settings of the plugin have been changed.
   */
  onSettingsChanged(): void
  {
    Log.log('settings changed');

    this.requestRefresh();
  }

  /**
   * Refreshes the changes made to obsidian by the tree focus plugin.
   */
  private refresh(): void
  {
    Log.log('refreshing');
    
    this.removeElementChanges();
    this.addElementChanges();
  }

  /**
   * Removes all changes made to obsidian by the tree focus plugin.
   */
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


  /**
   * Adds all obsidian modifications by the tree focus plugin.
   */
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

  /**
   * Gets all file explorers in the current workspace.
   */
  private getFileExplorers(): FileExplorer[]
  {
    Log.debug('getting file explorers');

    let list = this.app.workspace.getLeavesOfType(VIEW_TYPE_FILE_EXPLORER);

    let finalList = list.map((leaf) =>
    {
      return leaf.view as FileExplorer;
    });

    Log.debug('found file explorers', finalList);

    return finalList;
  }

  
}


