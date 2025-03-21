import RecipeModel from "../models/model";
import ResultsView from "../views/resultsView";
import RecipeView from "../views/recipeView";
import SearchView from "../views/searchView";
import BookmarkView from "../views/bookmarkView";
import { Recipe } from "../../interfaces/Recipe";

/**
 * Controller class to manage recipe-related interactions.
 */
export default class RecipeController {
  recipeModel: RecipeModel;
  resultsView: ResultsView;
  recipeView: RecipeView;
  searchView: SearchView;
  bookmarkView: BookmarkView;

  /**
   * Initializes the RecipeController with instances of models and views.
   */
  constructor() {
    this.recipeModel = new RecipeModel();
    this.resultsView = new ResultsView();
    this.recipeView = new RecipeView();
    this.searchView = new SearchView();
    this.bookmarkView = new BookmarkView();

    this.setupEventHandlers();
    this._getRandomRecipeController();
    this.recipeModel.loadBookmarks();
  }

  /**
   * Sets up event handlers for various views.
   */
  setupEventHandlers(): void {
    this.recipeView.hashChangeHandler(this._recipeController.bind(this));
    this.searchView.recipeSearchFormHandler(
      this._searchRecipeController.bind(this)
    );
    this.bookmarkView.bookmarkedRecipesBtnClickHandler(
      this._renderBookmarksController.bind(this)
    );
    this.recipeView.updateServingHandler(this._servingsController.bind(this));
    this.recipeView.bookmarkRecipeHandler(this._bookmarkController.bind(this));
  }

  /**
   * Controller to get random recipes and render them.
   * @private
   */
  _getRandomRecipeController = async function () {
    try {
      this.resultsView.renderSpinner();
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

  /**
   * Controller to handle the recipe details based on the URL hash.
   * @private
   */
  async _recipeController() {
    try {
      // Get the recipe ID from the URL hash
      const id = window.location.hash.slice(1);
      if (!id) return;
      this.recipeView.renderSpinner();
      await this.recipeModel.loadRecipe(id);
      this.recipeView.render(this.recipeModel.recipe);
    } catch (err) {
      this.recipeView.renderError(err);
    }
  }

  /**
   * Controller to handle the search functionality and render results.
   * @private
   */
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

  /**
   * Controller to handle the bookmark functionality.
   * @param {number} id - The ID of the recipe to be bookmarked or unbookmarked.
   * @private
   */
  _bookmarkController(id: number) {
    const recipeIsbookmarked = this.recipeModel.bookmarks.some(
      (bookmark: Recipe) => bookmark.id === id
    );
    if (recipeIsbookmarked) this.recipeModel.removeBookmark();
    else this.recipeModel.addBookmark();

    this.recipeView.render(this.recipeModel.recipe);
    // If user bookmarked/unbookmarked a recipe while bookmarked recipes are rendering,
    // render new bookmarked list.
    if (this.recipeModel.bookmarkIsActive) {
      if (this.recipeModel.bookmarks.length < 1) {
        this.resultsView.renderError(
          "There is no bookmarked recipes. Please find your favorite recipe and bookmark it :)"
        );
      } else this.resultsView.render(this.recipeModel.bookmarks);
    }
  }

  /**
   * Controller to handle the serving size updates.
   * @param {number} newServings - The new number of servings.
   * @private
   */
  _servingsController(newServings: number) {
    this.recipeModel.updateServings(newServings);
    this.recipeView.render(this.recipeModel.recipe);
  }

  /**
   * Controller to render bookmarks or search results based on the bookmark state.
   * @private
   */
  _renderBookmarksController() {
    // Toggle the bookmark active state
    this.recipeModel.bookmarkIsActive = !this.recipeModel.bookmarkIsActive;
    // Display an error message if there are no bookmarks and the bookmark view is active
    if (
      this.recipeModel.bookmarks.length < 1 &&
      this.recipeModel.bookmarkIsActive
    ) {
      this.resultsView.renderError(
        "There is no bookmarked recipes. Please find your favorite recipe and bookmark it :)"
      );
      return;
    }
    // Render bookmarks if active, otherwise render search results
    if (this.recipeModel.bookmarkIsActive) {
      this.resultsView.render(this.recipeModel.bookmarks);
    } else {
      this.resultsView.render(this.recipeModel.searchResults);
    }
  }
}
