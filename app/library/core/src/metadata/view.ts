


export enum ViewEncapsulation {
  /**
   * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
   * Element and pre-processing the style rules provided via
   * {@link ViewMetadata#styles} or {@link ViewMetadata#stylesUrls}, and adding the new Host Element
   * attribute to all selectors.
   *
   * This is the default option.
   */
  Emulated,

  Native,
    /**
     * Don't provide any template or style encapsulation.
     */
  None
}
