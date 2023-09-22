import 'obsidian';

declare module 'obsidian' {

  export class FileExplorer extends View {

    /**
     * A map of file paths to their corresponding {@link FileExplorerItem} items. 
     * 
     * **ATTENTION**  
     * > This is not populated until the file explorer is ready. Check with the
     * `<FileExplorer>.ready` property. 
     */
    fileItems: { 
      [key: string]: FileExplorerItem 
    };
    ready: boolean;
    files: WeakMap<HTMLDivElement, TAbstractFile>;
    getViewType(): string;
    getDisplayText(): string;
    onClose(): Promise<void>;
  }

  export type FileExplorerItem = FolderItem | FileItem;

  export interface FileItem {
    el: HTMLDivElement;
    file: TFile;
    fileExplorer: FileExplorer;
    info: any;
    selfEl: HTMLDivElement;
    innerEl: HTMLDivElement;
  }

  export interface FolderItem {
    el: HTMLDivElement;
    fileExplorer: FileExplorer;
    info: any;
    selfEl: HTMLDivElement;
    innerEl: HTMLDivElement;
    file: TFolder;
    children: FileExplorerItem[];
    childrenEl: HTMLDivElement;
    collapseIndicatorEl: HTMLDivElement;
    collapsed: boolean;
    pusherEl: HTMLDivElement;
  }
}


