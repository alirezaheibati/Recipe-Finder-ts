export default class BookmarkView {
  protected _parentElement: HTMLElement;
  constructor() {
    this._parentElement = document.getElementById("view-bookmarks-btn");
  }

  bookmarkedRecipesBtnClickHandler(handler: () => void) {
    this._parentElement.addEventListener("click", () => {
      this._parentElement.classList.toggle("text-red-500");
      handler();
    });
  }
}
