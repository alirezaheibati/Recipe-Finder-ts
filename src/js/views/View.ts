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
}
