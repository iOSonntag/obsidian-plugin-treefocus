import { ItemFocusMode } from './general';


export type MatchMethod = 'EQUALS' | 'CONTAINS' | 'STARTS_WITH' | 'ENDS_WITH' | 'REGEX';
export type MatchContext = 'NAME' | 'PATH';

type Matcher = {
  method: MatchMethod;
  context: MatchContext;
  value: string;
};


export type MatchingRule = {
  matcher: Matcher;
  mode: ItemFocusMode;
  excludes: Matcher[]
};

/**
 * A map of file paths to their {@link ItemFocusMode} set if any.
 */
export type FilesFocusModeMap = Record<string, ItemFocusMode | undefined>;