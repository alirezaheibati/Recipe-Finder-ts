import { getJSON } from "../util/helper";
import { API_KEY, API_URL } from "../util/config";
import { Recipe } from "../../interfaces/Recipe";

/**
 * Model class to manage recipe data and interactions with the API.
 */
export default class RecipeModel {
  public searchResults: Recipe[];
  public bookmarks: Recipe[];
  public recipe: Recipe;
  public bookmarkIsActive: boolean;

  /**
   * Initializes the RecipeModel with default values.
   */
  constructor() {
    this.searchResults = [];
    this.bookmarks = [];
    this.bookmarkIsActive = false;
  }

  /**
   * Fetches random recipes from the API and updates the search results.
   * @returns {Promise<void>}
   */
  getRandomRecipes = async function (): Promise<void> {
    try {
      const data = await getJSON(`${API_URL}random?number=5&apiKey=${API_KEY}`);
      this.searchResults = data.recipes;
    } catch (err) {
      throw err;
    }
  };

  /**
   * Loads a specific recipe by its ID from the API.
   * @param {string} id - The ID of the recipe to load.
   * @returns {Promise<void>}
   */
  async loadRecipe(id: string) {
    try {
      const data = await getJSON(
        `${API_URL}${id}/information?apiKey=${API_KEY}`
      );

      this.recipe = {
        id: data.id,
        title: data.title,
        cookingTime: data.readyInMinutes,
        publisher: data.sourceName,
        sourceUrl: data.sourceUrl,
        image: data.image,
        summary: data.summary,
        servings: data.servings,
        ingredients: data.extendedIngredients,
        healthScore: data.healthScore,
        price: data.pricePerServing,
        bookmark: false,
      };
      // Check if the recipe is bookmarked
      const recipeIsbookmarked = this.bookmarks.some(
        (bookmark: Recipe) => bookmark.id === this.recipe.id
      );
      if (recipeIsbookmarked) this.recipe.bookmark = true;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Loads recipes based on a search query from the API.
   * @param {string} query - The search query to use.
   * @returns {Promise<void>}
   */
  async loadSearchRecipes(query: string) {
    try {
      const data = await getJSON(
        `${API_URL}complexSearch?query=${query}&number=10&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      this.searchResults = data.results;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Stores the current list of bookmarks in local storage.
   * @private
   */
  _storageBookmark() {
    localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
  }

  /**
   * Adds the current recipe to the list of bookmarks and updates local storage.
   */
  addBookmark() {
    this.recipe.bookmark = true;
    this.bookmarks.push(this.recipe);
    this._storageBookmark();
  }

  /**
   * Removes the current recipe from the list of bookmarks and updates local storage.
   */
  removeBookmark() {
    this.bookmarks = this.bookmarks.filter(
      (bookmark) => bookmark.id !== this.recipe.id
    );
    this.recipe.bookmark = false;
    this._storageBookmark();
  }

  /**
   * Loads bookmarks from local storage.
   */
  loadBookmarks() {
    const storage = localStorage.getItem("bookmarks");
    if (storage) this.bookmarks = JSON.parse(storage);
  }

  /**
   * Updates the ingredient amounts based on the new number of servings.
   * @param {number} newServings - The new number of servings.
   */
  updateServings(newServings: number) {
    this.recipe.ingredients.forEach((ingredient) => {
      ingredient.amount =
        (ingredient.amount * newServings) / this.recipe.servings;
    });
    this.recipe.servings = newServings;
  }
}
