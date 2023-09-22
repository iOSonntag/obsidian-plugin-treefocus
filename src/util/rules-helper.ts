import { Rule } from 'src/types/rules';

export abstract class RulesHelper {

  static createRule(): Rule
  {
    return {
      matcher: {
        method: 'STARTS_WITH',
        value: '',
        context: 'NAME',
      },
      mode: 'DEFAULT',
      excludes: []
    };
  }

  static ruleIsValid(rule: Rule): boolean
  {
    return rule.matcher.value.length > 0;
  }


}