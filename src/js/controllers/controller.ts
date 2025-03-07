import RecipeModel from "../models/model";
import ResultsView from "../views/resultsView";

export default class RecipeController {
  recipeModel: RecipeModel;
  resultsView: ResultsView;
  constructor() {
    this.recipeModel = new RecipeModel();
    this.resultsView = new ResultsView();

    this.setupEventHandlers();
    this._getRandomRecipeController();
  }

  setupEventHandlers(): void {}

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
}
