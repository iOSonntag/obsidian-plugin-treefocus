


export abstract class CssTool {

  /**
   * Applies the given styles to multiple html elements using Obsidians own
   * implementation ({@link HTMLElement.setCssStyles}).
   */
  static applyStylesToMany(htmlElements: HTMLElement[], styles: Partial<CSSStyleDeclaration>): void
  {
    for (let htmlElement of htmlElements)
    {
      this.applyStyles(htmlElement, styles);
    }
  }


  /**
   * Applies the given styles to the given html element using Obsidians own
   * implementation ({@link HTMLElement.setCssStyles}).
   */
  static applyStyles(htmlElement: HTMLElement, styles: Partial<CSSStyleDeclaration>): void
  {
    // uses obsidian's built-in css helper
    htmlElement.setCssStyles(styles);
  }


  /**
   * Applies a data attribute to the given html element. 
   * 
   * **Note** 
   * - the key should be camel cased because it will be converted to kebab case
   *   automatically. 
   * - the key will be prefixed with `data-` automatically. 
   * 
   * Example:
   * ```ts
   * CssTool.applyDataAttribute(htmlElement, 'myAttribute', 'SOME_VALUE');
   * ```
   * Results in:
   * ```html
   * <div data-my-attribute="SOME_VALUE"></div>
   * ```
   */
  static applyDataAttribute(htmlElement: HTMLElement, key: string, value: string): void
  {
    htmlElement.dataset[key] = value;
  }

  /**
   * Removes a data attribute from the given html element.
   * 
   * **Note**
   * - the key should be camel cased because it will be converted to kebab case
   *   automatically.
   * - the key will be prefixed with `data-` automatically.
   * 
   * Example:
   * ```ts
   * CssTool.removeDataAttribute(htmlElement, 'myAttribute');
   * ```
   * When having this html element:
   * ```html
   * <div data-my-attribute="SOME_VALUE"></div>
   * ```
   */
  static removeDataAttribute(htmlElement: HTMLElement, key: string): void
  {
    delete htmlElement.dataset[key];
  }

}
