import { App, FileExplorer, Menu, PluginManifest, TAbstractFile, WorkspaceLeaf } from 'obsidian';
import { pluginMetaData } from 'src/_config/meta';
import { TreeFocus } from 'src/core/tree-focus';
import { ObsidianPlugin } from 'src/enhanced-obsidian-components/obsidian-plugin';
import { SOURCE_TYPE_FILE_EXPLORER_CONTEXT_MENU, VIEW_TYPE_FILE_EXPLORER } from 'src/enhanced-obsidian-components/known-type-keys';
import { Log } from 'src/util/logger';

export default class TreeFocusPlugin extends ObsidianPlugin {

  treeFocus: TreeFocus;

  constructor(app: App, manifest: PluginManifest)
  {
    super(app, manifest, pluginMetaData);

    this.treeFocus = new TreeFocus(app, this, manifest);
  }

  async onload()
  {
    await super.onload();

    await this.treeFocus.init();

    // Obsidian recommends wrapping every event listeners into
    // this.registerEvent() - but this is an exception because it gets only
    // called once.
    this.app.workspace.onLayoutReady(() => this.treeFocus.requestRefresh());

    this.registerEvent(this.app.workspace.on('layout-change', () => this.onObsidianEvent('workspace.layout-change')));
    this.registerEvent(this.app.workspace.on('file-menu', (menu, file, source, leaf) => this.onFileMenu(menu, file, source, leaf)));

    this.registerEvent(this.app.vault.on('create', () => this.onObsidianEvent('vault.create')));
    this.registerEvent(this.app.vault.on('delete', () => this.onObsidianEvent('vault.delete')));
    this.registerEvent(this.app.vault.on('rename', () => this.onObsidianEvent('vault.rename')));

    this.addSettingTab(this.treeFocus.getSettingsView());

    Log.log('obsidian plugin skeleton loading complete');
  }


  getFileExplorers(): FileExplorer[]
  {
    let list = this.app.workspace.getLeavesOfType(VIEW_TYPE_FILE_EXPLORER);

    return list.map((leaf) => leaf.view as FileExplorer);
  }

  onObsidianEvent(name: string): void
  {
    Log.eventFired(name);

    this.treeFocus.requestRefresh();
  }

  onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): any
  {
    Log.eventFired('workspace.file-menu');
    Log.debug('menu', menu, 'file', file, 'source', source, 'leaf', leaf);

    if (source !== SOURCE_TYPE_FILE_EXPLORER_CONTEXT_MENU) return;

    this.treeFocus.onOpenFileExplorerContextMenu(menu, file);
  }











  onunload()
  {
    super.onunload();
  }








	// async onloadOld()
  // {
	// 	await this.loadSettings();

	// 	// This creates an icon in the left ribbon.
	// 	const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
	// 		// Called when the user clicks the icon.
	// 		new Notice('This is a notice!!!!');

      
	// 	});
	// 	// Perform additional things with the ribbon
	// 	ribbonIconEl.addClass('my-plugin-ribbon-class');

	// 	// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
	// 	const statusBarItemEl = this.addStatusBarItem();
	// 	statusBarItemEl.setText('Status Bar Text');

	// 	// This adds a simple command that can be triggered anywhere
	// 	this.addCommand({
	// 		id: 'open-sample-modal-simple',
	// 		name: 'Open sample modal (simple)',
	// 		callback: () => {
	// 			new SampleModal(this.app).open();
	// 		}
	// 	});
	// 	// This adds an editor command that can perform some operation on the current editor instance
	// 	this.addCommand({
	// 		id: 'sample-editor-command',
	// 		name: 'Sample editor command',
	// 		editorCallback: (editor: Editor, view: MarkdownView) => {
	// 			console.log(editor.getSelection());
	// 			editor.replaceSelection('Sample Editor Command');
	// 		}
	// 	});
	// 	// This adds a complex command that can check whether the current state of the app allows execution of the command
	// 	this.addCommand({
	// 		id: 'open-sample-modal-complex',
	// 		name: 'Open sample modal (complex)',
	// 		checkCallback: (checking: boolean) => {
	// 			// Conditions to check
	// 			const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
	// 			if (markdownView) {
	// 				// If checking is true, we're simply "checking" if the command can be run.
	// 				// If checking is false, then we want to actually perform the operation.
	// 				if (!checking) {
	// 					new SampleModal(this.app).open();
	// 				}

	// 				// This command will only show up in Command Palette when the check function returns true
	// 				return true;
	// 			}
	// 		}
	// 	});

	// 	// This adds a settings tab so the user can configure various aspects of the plugin
	// 	this.addSettingTab(new SampleSettingTab(this.app, this));

	// 	// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
	// 	// Using this function will automatically remove the event listener when this plugin is disabled.
	// 	this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
	// 		console.log('click', evt);
	// 	});

	// 	// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
	// 	this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	// }
}













