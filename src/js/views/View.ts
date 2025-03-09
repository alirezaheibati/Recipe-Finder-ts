/**
 * Abstract class representing a view in the application.
 */
export default abstract class View {
  /**
   * The data to be rendered by the view.
   * @type {any}
   * @protected
   */
  protected _data: any;

  /**
   * The parent HTML element to which the view will be rendered.
   * @type {HTMLElement}
   * @protected
   */
  protected _parentElement: HTMLElement;

  /**
   * Abstract method to generate markup for the view.
   * @returns {string} The generated markup.
   * @abstract
   */
  abstract _generateMarkup(): string;

  /**
   * Creates an instance of View.
   * @param {HTMLElement} parentElement - The parent HTML element.
   */
  constructor(parentElement: HTMLElement) {
    this._parentElement = parentElement;
  }

  /**
   * Renders the provided data into the parent element.
   * @param {any} data - The data to be rendered.
   */
  render(data: any): void {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Renders a spinner to indicate loading state.
   */
  renderSpinner() {
    const markup = `
        <div
            class="spinner h-full w-full flex justify-center items-center -translate-x-6"
          >
            <i class="fa-solid fa-spinner text-8xl animate-spin"></i>
        </div>
        `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Renders an error message.
   * @param {string} message - The error message to be displayed.
   */
  renderError(message: string) {
    const markup = `
          <div
          class="h-full w-full flex justify-center font-mono items-center"
          >
            <p>
              <i class="fa-solid fa-face-meh text-red-500"></i>
                ${message}
            </p>
          </div> 
    `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
