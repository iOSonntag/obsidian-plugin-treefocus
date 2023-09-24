
import { App as ObsidianApp, Plugin as ObsidianPlugin, PluginManifest as ObsidianPluginManifest } from 'obsidian';
import { ErrorHelper } from 'src/util/error-helper';


export abstract class Bundle {

  private static _app?: WeakRef<ObsidianApp>;
  private static _plugin?: WeakRef<ObsidianPlugin>;
  private static _manifest?: WeakRef<ObsidianPluginManifest>;


  static _internalInit(app: ObsidianApp, plugin: ObsidianPlugin, manifest: ObsidianPluginManifest)
  {
    this._app = new WeakRef(app);
    this._plugin = new WeakRef(plugin);
    this._manifest = new WeakRef(manifest);
  }
  
  
  static get app(): ObsidianApp
  {
    let app = this._app?.deref();

    if (!app)
    {
      throw ErrorHelper.pluginBug('App is not initialized or already garbage collected.');
    }

    return app;
  }

  static get plugin(): ObsidianPlugin
  {
    let plugin = this._plugin?.deref();

    if (!plugin)
    {
      throw ErrorHelper.pluginBug('Plugin is not initialized or already garbage collected.');
    }

    return plugin;
  }

  static get manifest(): ObsidianPluginManifest
  {
    let manifest = this._manifest?.deref();

    if (!manifest)
    {
      throw ErrorHelper.pluginBug('Manifest is not initialized or already garbage collected.');
    }

    return manifest;
  }


}