import { ItemFocusMode } from 'src/types/general';
import { FilesFocusModeMap, Rule } from 'src/types/rules';
import { Log } from 'src/util/logger';
import { RulesHelper } from 'src/util/rules-helper';



export abstract class ModeEvaluationService {

  static rules: Rule[];
  static files: FilesFocusModeMap;

  static updateConfig(rules: Rule[], files: FilesFocusModeMap): void
  {
    this.rules = rules;
    this.files = files;
  }

  static getExplicitModeIfSet(path: string): ItemFocusMode | undefined
  {
    return this.files[path];
  }

  static evaluateMode(path: string, name: string): ItemFocusMode
  {
    const explicitMode = this.getExplicitModeIfSet(path);

    if (explicitMode)
    {
      Log.debug('explicit mode', explicitMode);

      return explicitMode;
    }

    for (const rule of this.rules)
    {
      if (RulesHelper.ruleIsValid(rule) === false)
      {
        continue;
      }

      if (this.matchesRule(path, name, rule))
      {
        Log.debug('item matched rule');
        Log.debug('path:', path);
        Log.debug('mode:', rule.mode);

        return rule.mode;
      }
    }

    return 'DEFAULT';
  }

  static matchesRule(path: string, name: string, rule: Rule): boolean
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

  static matchesEquals(value: string, matcher: { value: string }): boolean
  {
    return value === matcher.value;
  }

  static matchesContains(value: string, matcher: { value: string }): boolean
  {
    return value.includes(matcher.value);
  }

  static matchesStartsWith(value: string, matcher: { value: string }): boolean
  {
    return value.startsWith(matcher.value);
  }

  static matchesEndsWith(value: string, matcher: { value: string }): boolean
  {
    return value.endsWith(matcher.value);
  }

  static matchesRegex(value: string, matcher: { value: string }): boolean
  {
    const regex = new RegExp(matcher.value);
    return regex.test(value);
  }

}