
import { PluginInfo } from './plugin-info';


export abstract class PluginStrings {


  static get pluginBugAppendix(): string
  {
    return `\n\n!!! UNEXPECTED !!!\n
    You discovered a bug in the plugin '${PluginInfo.manifest.name}'. I kindly ask you to report this issue on GitHub.
    
    This way you & all other people can profit from your discovery! :)
    
    
    Please include the following information in your report:
    
    \t- ${PluginInfo.humanIdentifier}
    \t- Obsidian @ v${PluginInfo.obsidianVersion}
    
    Link for issue the report:
    
    \t${PluginInfo.meta.reportIssuesUrl}
    
    
    `;
  }

}