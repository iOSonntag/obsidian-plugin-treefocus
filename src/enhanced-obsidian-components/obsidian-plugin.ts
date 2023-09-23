
import { App, Plugin, PluginManifest } from 'obsidian';
import { PluginMeta } from 'src/types/plugin';
import { Log } from 'src/util/logger';
import { PluginInfo } from 'src/core/plugin-info';
import { P } from 'src/core/plugin';


export class ObsidianPlugin extends Plugin {
  
  constructor(app: App, manifest: PluginManifest, meta: PluginMeta)
  {
    super(app, manifest);

    P._internalInit(app, this, manifest);

    PluginInfo._internalInit(app, manifest, meta);
  }

  /**
   * From Obsidian Docs:
   * 
   * *Runs whenever the user starts using the plugin in Obsidian.*  
   * *This is where you'll configure most of the plugin's capabilities.*
   * 
   * @mustCallSuper
   */
  async onload()
  {
    Log.log('');
    Log.log('obsidian plugin loading');
  }

  /**
   * From Obsidian Docs:
   * 
   * *Runs when the plugin is disabled.*  
   * *Any resources that your plugin is using must be released here to avoid
   * affecting the performance of Obsidian after your plugin has been disabled.* 
   * 
   * @mustCallSuper
   */
  onunload()
  {
    Log.log('obsidian plugin unloading');
  }

  // IMPROVE: add automatic logging of events
  // registerEvent(eventRef: EventRef): void
  // {
  //   Log.log('obsidian plugin is registering event', eventRef);

  //   super.registerEvent(eventRef);
  // }

  // eventHandled(name: string): void
  // {
  //   Log.obsidianEvent(name);
  // }

  // listenWorkspaceEvent(name: 'layout-change', callback: () => void): void
  // {
  //   Log.obsidianEvent(name);
  //   callback.bind(this);

  //   super.registerEvent(this.app.workspace.on(name, () => 
  //   {
  //     this.eventHandled(name);
  //     callback();
  //   }));
  // }

}