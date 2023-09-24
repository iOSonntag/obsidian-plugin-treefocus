import { App, PluginManifest, apiVersion } from 'obsidian';
import { ErrorHelper } from '../util/error-helper';

type HttpsUrl = `https://${string}`;
type RepositoryType = 'git' | 'hg' | 'svn';
type RepositoryProvider = 'GitHub' | 'GitLab' | 'Bitbucket' | 'Gitea' | 'Gogs' | 'Custom';
interface TreeFocusPluginManifest extends PluginManifest {
  repository?: {
    type?: RepositoryType;
    provider?: RepositoryProvider;
    providerUrl?: HttpsUrl;
    repoUrl?: HttpsUrl;
    issuesUrl?: HttpsUrl;
  }
}
export abstract class PluginInfo {

  private static _obsidianVersion: string;
  private static _manifest: TreeFocusPluginManifest;

  static get obsidianVersion()
  {
    if (!this._obsidianVersion)
    {
      throw ErrorHelper.pluginBug('Trying to access Obsidian version before it was set.');
    }

    return this._obsidianVersion;
  };

  static get manifest(): TreeFocusPluginManifest
  {
    if (!this._manifest)
    {
      throw ErrorHelper.pluginBug('Trying to access manifest before it was set.');
    }

    return this._manifest;
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

  static _internalInit(app: App, manifest: PluginManifest)
  {
    if (this._manifest || this._obsidianVersion)
    {
      throw ErrorHelper.pluginBug('Trying to set plugin info twice.');
    }

    this._obsidianVersion = apiVersion;
    this._manifest = manifest;
  }
}