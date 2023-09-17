import { ItemFocusMode } from './general';


type MatchMethod = 'PATH' | 'REGEX';

type MatcherBase = {
  method: MatchMethod;
};

type PathMatcher = MatcherBase & {
  method: 'PATH';
  path: string;
};

type RegexMatcher = MatcherBase & {
  method: 'REGEX';
  regex: string;
  /**
   * If true, the regex will be matched against the full path, otherwise only
   * the file name.
   * 
   * Default: `false`
   */
  fullPath: boolean;
};

type Matcher = PathMatcher | RegexMatcher;

export type Rule = {
  mather: Matcher;
  mode: ItemFocusMode;
  excludes: Matcher[]
};

/**
 * A map of file paths to their {@link ItemFocusMode} set if any.
 */
export type FilesFocusModeMap = Record<string, ItemFocusMode | undefined>;