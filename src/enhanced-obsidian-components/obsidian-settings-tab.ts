import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';


export type SettingsContext = {
  rootElement: HTMLElement;
  /**
   * Use this method to create a setting. You can use the returned setting to
   * set the name, description, etc.
   * 
   * ```ts
   * context.createSetting()
   *  .setName('My Setting')
   *  .setDesc('My description');
   * ```
   */
  createSetting: () => Setting
  /**
   * Creates a section header with an optional description.
   */
  createSectionHeader: (title: string, description?: string) => void;
  /**
   * Use this method to create a large divider.
   */
  createSectionDivider: () => void;
  /**
   * Call this method to apply the settings. This will rebuild the settings tab
   * and call {@link settingsUpdated}.
   */
  applySettings: () => void;
  createSupportLinks: (buyMeACoffee?: string, payPalUrl?: string) => void;
};

export abstract class ObsidianSettingsTab extends PluginSettingTab {

	constructor(app: App, plugin: Plugin)
  {
		super(app, plugin);
	}

  /**
   * Do not override this method. Override {@link build} instead.
   */
	display(): void
  {
		const rootElement = this.containerEl;

		rootElement.empty();

    const context: SettingsContext = {
      rootElement: rootElement,
      createSetting: () => new Setting(rootElement),
      createSectionHeader: (title: string, description?: string) => 
      {
        rootElement.createEl('h3', { text: title })

        if (description)
        {
          rootElement.createDiv({ cls: 'setting-section-description', text: description });
        }
      },
      createSectionDivider: () => rootElement.createDiv({ cls: 'setting-section-divider' }),
      createSupportLinks: (buyMeACoffeeUsername?: string, payPalUrl?: string) =>
      {
        if (buyMeACoffeeUsername)
        {
          rootElement.createEl('br');
          const parentEl = rootElement.createEl('a', { 
            href: `https://www.buymeacoffee.com/${buyMeACoffeeUsername}`,
          });
          parentEl.createEl('img', {
            attr: {
              src: 'https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png',
              alt: 'Buy Me A Coffee',
              style: 'height: 60px !important;width: 217px !important;'
            }
          });
          rootElement.createEl('br');
        }
        
        if (payPalUrl)
        {
          rootElement.createEl('br');
          const parentEl = rootElement.createEl('a', { 
            href: payPalUrl,
          });
          parentEl.createEl('img', {
            attr: {
              src: 'https://www.paypalobjects.com/webstatic/de_DE/i/de-pp-logo-200px.png',
              alt: 'Donate with PayPal',
              style: 'height: 60px !important;width: 217px !important;'
            }
          });
          rootElement.createEl('br');
        }
      },
      applySettings: () =>
      {
        this.display();
        this.didUpdateSettings();
      }
    };

    this.build(context);
	}

  /**
   * Override this method to build up the settings tab.
   * 
   * Use the provided `context` to create settings e.g.:
   * 
   * ```ts
   * context.createSetting()
   *  .setName('My Setting')
   *  .setDesc('My description');
   * ```
   */
  abstract build(context: SettingsContext): void


  /**
   * Override this method to react to settings changes.
   */
  abstract didUpdateSettings(): void;
}
