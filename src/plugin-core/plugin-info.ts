import { App, PluginManifest, apiVersion } from 'obsidian';
import { ErrorHelper } from '../util/error-helper';
import { PluginMeta } from 'src/types/plugin';



export abstract class PluginInfo {

  private static _obsidianVersion: string;
  private static _manifest: PluginManifest;
  private static _meta: PluginMeta;

  static get obsidianVersion()
  {
    if (!this._obsidianVersion)
    {
      throw ErrorHelper.pluginBug('Trying to access Obsidian version before it was set.');
    }

    return this._obsidianVersion;
  };

  static get manifest(): PluginManifest
  {
    if (!this._manifest)
    {
      throw ErrorHelper.pluginBug('Trying to access manifest before it was set.');
    }

    return this._manifest;
  }

  static get meta(): PluginMeta
  {
    if (!this._meta)
    {
      throw ErrorHelper.pluginBug('Trying to access meta before it was set.');
    }

    return this._meta;
  }

  static get humanIdentifier(): string
  {
    return `${this.manifest.name} (${this.manifest.id} @ v${this.manifest.version})`;
  }

  static get pluginId(): string
  {
    return this.manifest.id;
  }

  static get pluginName(): string
  {
    return this.manifest.name;
  }

  static _internalInit(app: App, manifest: PluginManifest, meta: PluginMeta)
  {
    if (this._manifest || this._obsidianVersion || this._meta)
    {
      throw ErrorHelper.pluginBug('Trying to set plugin info twice.');
    }

    this._obsidianVersion = apiVersion;
    this._manifest = manifest;
    this._meta = meta;
  }
}