/**
 * Class representing the search view.
 */
export default class SearchView {
  /**
   * The parent HTML element for the search form.
   * @type {HTMLElement}
   * @protected
   */
  protected _parentElement: HTMLElement;

  /**
   * Creates an instance of SearchView and initializes the parent element.
   */
  constructor() {
    this._parentElement = document.getElementById("search-form");
  }

  /**
   * Retrieves the search query from the input field.
   * @returns {string} The search query.
   */
  getQuery(): string {
    const inputElement = this._parentElement.querySelector(
      ".search-input"
    ) as HTMLInputElement;
    return inputElement.value;
  }

  /**
   * Attaches a handler to the search form submit event.
   * @param {() => void} handler - The handler function to call on form submission.
   */
  recipeSearchFormHandler(handler: () => void) {
    this._parentElement.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      handler();
    });
  }
}
