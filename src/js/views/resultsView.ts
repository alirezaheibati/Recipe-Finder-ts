import RecipeAPIResponse from "../../interfaces/RecipeAPIResponse";
import View from "./View";

/**
 * Class representing the view for displaying search results.
 */
class ResultsView extends View {
  /**
   * Creates an instance of ResultsView and initializes the parent element.
   */
  constructor() {
    super(document.getElementById("aisle-container"));
  }

  /**
   * Generates the markup for the search results.
   * @returns {string} The generated markup as a string.
   * @protected
   */
  _generateMarkup(): string {
    return this._data
      .map((recipe: RecipeAPIResponse) => {
        return `
        <a href="#${recipe.id}" class="block w-full">
                        <div
              class="w-full flex justify-around align-middle bg-[#374552] mb-4 rounded-4xl text-slate-100 py-4 font-mono relative last:mb-0"
              title="${recipe.title}"
            >
              <img
                src="${recipe.image}"
                alt="${recipe.title}"
                class="rounded-full h-20 w-20 absolute top-1/2 -translate-y-1/2 -left-10"
              />
              <div class="sm:pr-12 tm:pr-4 md:pr-4 xl:pr-12 pl-12 pr-1 w-full">
                <h1
                  class="mb-2 text-lg whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  ${recipe.title}
                </h1>
                <div class="flex justify-between align-middle flex-wrap">
                  <div class="w-full tm:w-auto">
                    <p class="text-slate-400">HealthScore:</p>
                    <div>
                    ${recipe.healthScore}/100
                    </div>
                  </div>
                  <div>
                    <p class="text-slate-400">Cooking time:</p>
                    ${recipe.cookingMinutes ?? recipe.readyInMinutes}min
                  </div>
                </div>
              </div>
              </a>
            </div>
        `;
      })
      .join("\n");
  }
}

export default ResultsView;
