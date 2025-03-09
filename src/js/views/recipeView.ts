import View from "./View";

/**
 * Class representing the view for displaying a single recipe.
 */
class RecipeView extends View {
  /**
   * Creates an instance of RecipeView and initializes the parent element.
   */
  constructor() {
    super(document.getElementById("recipe-container"));
  }

  /**
   * Generates the markup for the recipe details.
   * @returns {string} The generated markup as a string.
   * @protected
   */
  _generateMarkup(): string {
    return `
              <div
            class="recepi-content lg:h-full relative text-slate-100 font-mono lg:overflow-y-auto custom-scrollbar"
          >
            <img
              src="${this._data.image}"
              alt="${this._data.title}"
              class="h-64 sm:w-64 w-full sm:rounded-full rounded-4xl block mx-auto"
            />
            <div
              class="sm:w-2/3 w-[95%] mx-auto bg-slate-100 rounded-4xl shadow-md -translate-y-1/3 sm:-translate-y-8 p-4 relative"
            >
              <h1 class="text-2xl text-slate-700 text-center">
              ${this._data.title}
              </h1>
              <p class="text-slate-500 text-center text-sm mt-1 mb-6">
                ${this._data.ingredients.length} ingredients
              </p>
              <div
                class="recipe-info flex flex-wrap justify-around items-center"
              >
                <p class="text-slate-500 w-1/2 sm:w-auto text-center">
                  <i class="fa-solid fa-clock" title="prepration time"></i> ${
                    this._data.cookingTime
                  }
                  min
                </p>
                <p
                  class="text-slate-500 w-1/2 sm:w-auto text-center"
                  title="price per serving"
                >
                  <i class="fa-solid fa-dollar"></i> ${this._data.price} dollar
                </p>
                <p class="text-slate-500 mt-2 sm:mt-0">
                  <i class="fa-solid fa-heart-pulse" title="health score"></i>
                  ${this._data.healthScore}/100
                </p>
              </div>
              <div
                class="flex sm:justify-around justify-center flex-wrap items-center mt-4"
              >
                <p
                  class="text-slate-500 w-full sm:w-auto text-center mb-2 sm:mb-0"
                >
                  Bookmark:
                  <i
                    class="fa-${
                      this._data.bookmark ? "solid" : "regular"
                    } fa-bookmark text-orange-500 cursor-pointer btn-bookmark"
                  ></i>
                </p>
                <p class="text-slate-500">
                  ${this._data.servings} Servings:
                  <i
                    class="serving-btn fa-solid fa-circle-minus text-orange-500 cursor-pointer"
                    data-update-to = "${this._data.servings - 1}"
                  ></i>
                  <i
                    class="serving-btn fa-solid fa-circle-plus text-orange-500 cursor-pointer"
                    data-update-to = "${this._data.servings + 1}"
                  ></i>
                </p>
              </div>
            </div>
            <h2 class="mb-2 text-orange-500 text-2xl">ingredients:</h2>
            <ul
              class="text-slate-500 mb-8 flex justify-between items-center flex-wrap [&_li]:w-full md:[&_li]:w-1/2 [&_li]:mb-2 [&_li]:text-slate-100"
            >${this._data.ingredients
              .map((ing: { amount: number; unit: string; name: string }) => {
                return `<li class="w-full md:w-1/2"><i class="fa-solid fa-circle-check text-orange-500"></i> ${ing.amount.toFixed(
                  2
                )} ${ing.unit} of ${ing.name}</li>`;
              })
              .join("\n")}
            </ul>
            <h2 class="mb-2 text-orange-500 text-2xl">How to cook it:</h2>
            <p>${this._data.summary}</p>
            <p>
              This recipe was carefully designed and tested by
              <b>${
                this._data.publisher
              }</b>. You can check out full directions at their
              website.
            </p>
            <a href="${this._data.sourceUrl}">
            <button
            class="rounded-4xl text-slate-100 mx-auto my-4 sm:w-48 w-1/2 flex items-center justify-center gap-4 p-4 h-12 font-mono bg-gradient-to-r from-red-400 to-orange-500"
            >
            <i class="fa-solid fa-link"></i>
            <p>Recipe</p>
            </button>
            </a>
          </div>
    `;
  }

  /**
   * Attaches a handler to the window hash change event.
   * @param {() => Promise<void>} handler - The handler function to call on hash change.
   */
  hashChangeHandler(handler: () => Promise<void>) {
    window.addEventListener("hashchange", handler);
  }

  /**
   * Attaches a handler to the serving size update buttons.
   * @param {(newServings: number) => void} handler - The handler function to call on serving size update.
   */
  updateServingHandler(handler: (newServings: number) => void) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = (e.target as Element).closest(".serving-btn");
      if (!btn) return;
      const newServings = +(btn as HTMLElement).dataset.updateTo;
      if (newServings > 1) handler(newServings);
    });
  }

  /**
   * Attaches a handler to the bookmark button click event.
   * @param {(id: number) => void} handler - The handler function to call on bookmark action.
   */
  bookmarkRecipeHandler(handler: (id: number) => void) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = (e.target as Element).closest(".btn-bookmark");
      if (!btn) return;
      handler(this._data.id);
    });
  }
}

export default RecipeView;
