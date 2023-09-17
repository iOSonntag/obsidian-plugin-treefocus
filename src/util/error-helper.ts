import { PluginStrings } from 'src/plugin-core/plugin-strings';
import { Log } from './logger';



export abstract class ErrorHelper {

  public static pluginBug(message: string): Error
  {
    let finalMessage = message;

    try
    {
      finalMessage += PluginStrings.pluginBugAppendix;
    }
    catch (e)
    {
      Log.error('Failed to append bug appendix to error message.', e);
    }

    return new Error(finalMessage);
  }

}