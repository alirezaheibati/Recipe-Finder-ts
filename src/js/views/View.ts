export default abstract class View {
  protected _data: any;
  protected _parentElement: HTMLElement;
  abstract _generateMarkup(): string;

  constructor(parentElement: HTMLElement) {
    this._parentElement = parentElement;
  }
}
