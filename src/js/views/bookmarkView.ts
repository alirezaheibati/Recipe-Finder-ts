/**
 * Class representing the bookmark view.
 */
export default class BookmarkView {
  /**
   * The parent HTML element for the bookmark button.
   * @type {HTMLElement}
   * @protected
   */
  protected _parentElement: HTMLElement;

  /**
   * Creates an instance of BookmarkView and initializes the parent element.
   */
  constructor() {
    this._parentElement = document.getElementById("view-bookmarks-btn");
  }

  /**
   * Attaches a handler to the bookmark button click event.
   * @param {() => void} handler - The handler function to call on button click.
   */
  bookmarkedRecipesBtnClickHandler(handler: () => void) {
    this._parentElement.addEventListener("click", () => {
      this._parentElement.classList.toggle("text-red-500");
      handler();
    });
  }
}
