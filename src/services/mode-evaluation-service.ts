import { PluginSettings } from 'src/core/plugin-settings';
import { ItemFocusMode } from 'src/types/general';
import { FilesFocusModeMap, MatchingRule } from 'src/types/matching-rules';
import { Log } from 'src/util/logger';
import { RulesHelper } from 'src/util/rules-helper';



export abstract class ModeEvaluationService {

  /**
   * Evaluates the mode for the given path and name of a file or folder.
   * 
   * Explicit mode is prioritized over rules.
   * 
   * If no explicit mode is set, the rules are evaluated in order of their
   * appearance in the settings. 
   * The first rule that matches the path or name of the file or folder is used.
   */
  static evaluateMode(path: string, name: string): ItemFocusMode
  {
    const explicitMode = PluginSettings.getExplicitMode(path);

    if (explicitMode)
    {
      Log.debug('explicit mode', explicitMode);

      return explicitMode;
    }

    for (const fiMatchingRule of PluginSettings.getMatchingRules())
    {
      if (RulesHelper.ruleIsValid(fiMatchingRule) === false)
      {
        continue;
      }

      if (this.matchesRule(path, name, fiMatchingRule))
      {
        Log.debug('item matched rule');
        Log.debug('path:', path);
        Log.debug('mode:', fiMatchingRule.mode);

        return fiMatchingRule.mode;
      }
    }

    return 'DEFAULT';
  }

  static matchesRule(path: string, name: string, rule: MatchingRule): boolean
  {
    const matcher = rule.matcher;

    const value = matcher.context === 'NAME' ? name : path;

    switch (matcher.method)
    {
      case 'EQUALS':
        return this.matchesEquals(value, matcher);
      case 'CONTAINS':
        return this.matchesContains(value, matcher);
      case 'STARTS_WITH':
        return this.matchesStartsWith(value, matcher);
      case 'ENDS_WITH':
        return this.matchesEndsWith(value, matcher);
      case 'REGEX':
        return this.matchesRegex(value, matcher);
      default:
        return false;
    }
  }

  private static matchesEquals(value: string, matcher: { value: string }): boolean
  {
    return value === matcher.value;
  }

  private static matchesContains(value: string, matcher: { value: string }): boolean
  {
    return value.includes(matcher.value);
  }

  private static matchesStartsWith(value: string, matcher: { value: string }): boolean
  {
    return value.startsWith(matcher.value);
  }

  private static matchesEndsWith(value: string, matcher: { value: string }): boolean
  {
    return value.endsWith(matcher.value);
  }

  private static matchesRegex(value: string, matcher: { value: string }): boolean
  {
    const regex = new RegExp(matcher.value);
    return regex.test(value);
  }

}