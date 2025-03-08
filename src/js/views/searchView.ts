export default class SearchView {
  protected _parentElement: HTMLElement;

  constructor() {
    this._parentElement = document.getElementById("search-form");
  }
  getQuery(): string {
    const inputElement = this._parentElement.querySelector(
      ".search-input"
    ) as HTMLInputElement;
    return inputElement.value;
  }
}
