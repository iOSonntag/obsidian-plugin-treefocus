import { Platform } from 'obsidian';
import { PluginInfo } from 'src/core/plugin-info';



export class Log {

  /**
     * Logs only if `Platform.isDesktopApp` and if available `process.env.NODE_ENV !== 'production'`.
     * 
     * Adds useful information to the log message and then logs it using `console.log`.
     * 
     * Info added:
     * - plugin id from {@link PluginMeta.id}
     */
  static debug(message: string, ...args: any[])
  {
    return;
    if (Platform.isDesktopApp)
    {
      // in case it is unknown we assume production, even though it is not correct
      // it serves the purpose of not logging, when not in dev mode.

      if ((process?.env?.NODE_ENV ?? 'production') !== 'production')
      {
        console.log(`[DEBUG][${PluginInfo.pluginId}]: ${message}`, ...args);
      }
    }
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