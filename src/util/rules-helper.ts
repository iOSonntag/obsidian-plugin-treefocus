import { MatchingRule } from 'src/types/matching-rules';

export abstract class RulesHelper {

  static createRule(): MatchingRule
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

  static ruleIsValid(rule: MatchingRule): boolean
  {
    return rule.matcher.value.length > 0;
  }


}