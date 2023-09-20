


export abstract class CssTool {

  /**
   * Applies the given styles to the given html element using Obsidians own
   * implementation ({@link HTMLElement.setCssStyles}).
   */
  static applyStyles(htmlElement: HTMLElement, styles: Partial<CSSStyleDeclaration>): void
  {
    // uses obsidian's built-in css helper
    htmlElement.setCssStyles(styles);
  }

}
