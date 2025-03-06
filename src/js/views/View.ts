export default abstract class View {
  protected _data: any;
  protected _parentElement: HTMLElement;
  abstract _generateMarkup(): string;

  constructor(parentElement: HTMLElement) {
    this._parentElement = parentElement;
  }

  render(data: any): void {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
