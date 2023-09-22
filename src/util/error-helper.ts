import { PluginStrings } from 'src/core/plugin-strings';
import { Log } from './logger';



export abstract class ErrorHelper {

  /**
   * Creates an error with the given message and additional information that
   * gives the user more details on the error such as that this is a plugin bug
   * and how to report it.
   * 
   * The error needs to be thrown manually.
   */
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