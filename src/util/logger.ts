import { PluginInfo } from 'src/plugin-core/plugin-info';



export class Log {

  /**
   * Adds useful information to the log message and then logs it using `console.log`.
   * 
   * Info added:
   * - plugin id from {@link PluginMeta.id}
   */
  static log(message: string, ...args: any[])
  {
    console.log(`[${PluginInfo.pluginId}] . ${message}`, ...args);
  }

  /**
   * Adds useful information to the warning and then logs it using `console.warn`.
   * 
   * Info added:
   * - plugin id from {@link PluginMeta.id}
   */
  static warn(message?: string, ...args: any[])
  {
    console.warn(`[${PluginInfo.pluginId}] . ${message}`, ...args);
  }

  /**
   * Adds useful information to the error message and then logs it using `console.error`.
   * 
   * Info added:
   * - plugin id from {@link PluginMeta.id}
   */
  static error(message?: string, ...args: any[])
  {
    console.error(`[${PluginInfo.pluginId}] . ${message}`, ...args);
  }


  /**
   * Logs an event from the Obsidian API.
   * 
   * Info added:
   * - plugin id from {@link PluginMeta.id}
   * - event name
   */ 
  static obsidianEvent(event: string, ...args: any[])
  {
    console.log(`[${PluginInfo.pluginId}] E [ObsidianEvent]: ${event}`, ...args);
  }

}