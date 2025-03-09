import "./styles/index.css";
import RecipeController from "./js/controllers/controller";

// Initializes the RecipeController once the DOM content is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
  const recipeController = new RecipeController();
});
