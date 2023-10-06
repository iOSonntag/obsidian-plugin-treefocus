
import { PluginInfo } from './plugin-info';


export abstract class PluginStrings {


  static get pluginBugAppendix(): string
  {
    return `\n\n!!! UNEXPECTED !!!\n
    You discovered a bug in the plugin '${PluginInfo.manifest.name}'. I kindly ask you to report this issue on ${PluginInfo.repository.provider ?? 'NOT_SET'}.
    
    This way you & all other people can benefit from your discovery! :)
    
    
    Please include the following information in your report:
    
    \t- ${PluginInfo.humanIdentifier}
    \t- Obsidian @ v${PluginInfo.obsidianVersion}
    
    Link for issue reporting:
    
    \t${PluginInfo.repository.issuesUrl ?? 'NOT_SET'}
    
    
    `;
  }

}