import RecipeModel from "../models/model";
import ResultsView from "../views/resultsView";
import RecipeView from "../views/recipeView";
import SearchView from "../views/searchView";

export default class RecipeController {
  recipeModel: RecipeModel;
  resultsView: ResultsView;
  recipeView: RecipeView;
  searchView: SearchView;

  constructor() {
    this.recipeModel = new RecipeModel();
    this.resultsView = new ResultsView();
    this.recipeView = new RecipeView();
    this.searchView = new SearchView();

    this.setupEventHandlers();
    this._getRandomRecipeController();
  }

  setupEventHandlers(): void {
    this.recipeView.hashChangeHandler(this._recipeController.bind(this));
    this.searchView.recipeSearchFormHandler(
      this._searchRecipeController.bind(this)
    );
  }

  _getRandomRecipeController = async function () {
    try {
      await this.recipeModel.getRandomRecipes();
      if (this.recipeModel.searchResults.length === 0) {
        throw new Error(
          "Something went wrong. Please search for your own desired recipe"
        );
      }

      this.resultsView.render(this.recipeModel.searchResults);
    } catch (err) {
      this.resultsView.renderError(err);
    }
  };

  async _recipeController() {
    try {
      // Get the recipe ID from the URL hash
      const id = window.location.hash.slice(1);
      if (!id) return;

      await this.recipeModel.loadRecipe(id);
      this.recipeView.render(this.recipeModel.recipe);
    } catch (err) {
      this.recipeView.renderError(err);
    }
  }
  async _searchRecipeController() {
    try {
      this.resultsView.renderSpinner();
      const query = this.searchView.getQuery();
      if (!query) return;
      await this.recipeModel.loadSearchRecipes(query);
      if (this.recipeModel.searchResults.length === 0) {
        throw new Error(
          "Nothing found for your query. Please try another thing"
        );
      }
      this.resultsView.render(this.recipeModel.searchResults);

      this.recipeView.renderSpinner();
      await this.recipeModel.loadRecipe(
        String(this.recipeModel.searchResults[0].id)
      );
      this.recipeView.render(this.recipeModel.recipe);
    } catch (err) {
      this.resultsView.renderError(err);
    }
  }
}
