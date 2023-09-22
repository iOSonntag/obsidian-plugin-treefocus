import { PluginInfo } from 'src/core/plugin-info';



export class Log {

  /**
     * Logs only if {@link PluginInfo.debug} mode is enabled.
     * 
     * Adds useful information to the log message and then logs it using `console.log`.
     * 
     * Info added:
     * - plugin id from {@link PluginMeta.id}
     */
  static debug(message: string, ...args: any[])
  {
    if (!PluginInfo.debug) return;


    console.log(`[DEBUG][${PluginInfo.pluginId}]: ${message}`, ...args);
  }
  

  /**
   * Adds useful information to the log message and then logs it using `console.log`.
   * 
   * Info added:
   * - plugin id from {@link PluginInfo.pluginId}
   */
  static log(message: string, ...args: any[])
  {
    console.log(`[INFO] [${PluginInfo.pluginId}]: ${message}`, ...args);
  }

  /**
   * Adds useful information to the warning and then logs it using `console.warn`.
   * 
   * Info added:
   * - plugin id from {@link PluginInfo.pluginId}
   */
  static warn(message?: string, ...args: any[])
  {
    console.warn(`[WARN] [${PluginInfo.pluginId}]: ${message}`, ...args);
  }

  /**
   * Adds useful information to the error message and then logs it using `console.error`.
   * 
   * Info added:
   * - plugin id from {@link PluginInfo.pluginId}
   */
  static error(message?: string, ...args: any[])
  {
    console.error(`[ERROR][${PluginInfo.pluginId}]: ${message}`, ...args);
  }


  /**
   * Use this logger to log triggered/called events.
   * 
   * Info added:
   * - plugin id from {@link PluginInfo.pluginId}
   * - event name
   */ 
  static eventFired(event: string, ...args: any[])
  {
    console.log(`[EVENT][${PluginInfo.pluginId}]: ${event}`, ...args);
  }

}