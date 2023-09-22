import { FileExplorer, FileExplorerItem } from 'obsidian';
import { Log } from 'src/util/logger';




export abstract class FileExplorerHelper {

  static forEveryItem(fileExplorer: FileExplorer, callback: (path: string, item: FileExplorerItem) => void): void
  {
    if (!fileExplorer.ready)
    {
      Log.warn('accessing a file explorer that is not ready yet (might be critical)', fileExplorer);
    }

    let paths: string[] = fileExplorer.fileItems ? Object.keys(fileExplorer.fileItems) : [];

    Log.debug('do for every file explorer item - count', paths.length);

    for (let fiPath of paths)
    {
      let item = fileExplorer.fileItems[fiPath];


      callback(fiPath, item);
    }
  }

}