import RecipeModel from "../models/model";
import ResultsView from "../views/resultsView";
import RecipeView from "../views/recipeView";

export default class RecipeController {
  recipeModel: RecipeModel;
  resultsView: ResultsView;
  recipeView: RecipeView;

  constructor() {
    this.recipeModel = new RecipeModel();
    this.resultsView = new ResultsView();
    this.recipeView = new RecipeView();

    this.setupEventHandlers();
    this._getRandomRecipeController();
  }

  setupEventHandlers(): void {
    this.recipeView.hashChangeHandler(this._recipeController.bind(this));
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
      console.log(err);

      console.log("some thing went wrong");
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
      console.log(err);
    }
  }
}
