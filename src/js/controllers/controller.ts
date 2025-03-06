import RecipeModel from "../models/model";
export default class RecipeController {
  recipeModel: RecipeModel;
  constructor() {
    this.recipeModel = new RecipeModel();
    this.setupEventHandlers();
  }
  setupEventHandlers(): void {}
}
