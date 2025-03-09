import { getJSON } from "../util/helper";
import { API_KEY, API_URL } from "../util/config";
import { Recipe } from "../../interfaces/Recipe";
export default class RecipeModel {
  public searchResults: Recipe[];
  public bookmarks: Recipe[];
  public recipe: Recipe;
  public bookmarkIsActive: boolean;

  constructor() {
    this.searchResults = [];
    this.bookmarks = [];
    this.bookmarkIsActive = false;
  }
  getRandomRecipes = async function (): Promise<void> {
    try {
      const data = await getJSON(`${API_URL}random?number=5&apiKey=${API_KEY}`);
      this.searchResults = data.recipes;
    } catch (err) {
      throw err;
    }
  };

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
  _storageBookmark() {
    localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
  }
}
