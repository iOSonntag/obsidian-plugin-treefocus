import { AFItem } from 'obsidian';
import { ItemFocusMode } from '../types/general';
import { FilesFocusModeMap, Rule } from '../types/rules';


/**
 * Checks if the given file item matches any of the given rules or any of the
 * file specific mode setting and returns the corresponding {@link ItemFocusMode}
 * accordingly. 
 * 
 * The file overwrites take precedence over the rules. If no mode is set on a
 * per item basis, the rules are checked. The first rule that matches without
 * being excluded is used. 
 */
export const determinateFocusMode = (fileItem: AFItem, rules: Rule[], files: FilesFocusModeMap): ItemFocusMode =>
{
  let filePath = fileItem.file.path;

  let itemLevelModeSetting = files[filePath];

  if (itemLevelModeSetting)
  {
    return itemLevelModeSetting;
  }

  for (let fiRule of rules)
  {
    let rule = fiRule;
    let matcher = rule.mather;

    let match = false;

    if (matcher.method === 'PATH')
    {
      match = filePath === matcher.path;
    }
    else if (matcher.method === 'REGEX')
    {
      let regex = new RegExp(matcher.regex);
      let matchPath = matcher.fullPath ? filePath : fileItem.file.name;
      match = regex.test(matchPath);
    }

    if (match)
    {
      let excludes = rule.excludes;
      let excluded = false;

      for (let fiExclude of excludes)
      {
        let excludeMatch = false;

        if (fiExclude.method === 'PATH')
        {
          excludeMatch = filePath === fiExclude.path;
        }
        else if (fiExclude.method === 'REGEX')
        {
          let regex = new RegExp(fiExclude.regex);
          let matchPath = fiExclude.fullPath ? filePath : fileItem.file.name;
          excludeMatch = regex.test(matchPath);
        }

        if (excludeMatch)
        {
          excluded = true;
          break;
        }
      }

      if (!excluded)
      {
        return rule.mode;
      }
    }
  }

  return 'DEFAULT';
}