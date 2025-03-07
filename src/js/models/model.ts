import { getJSON } from "../util/helper";
import { API_KEY, API_URL } from "../util/config";
import { Recipe } from "../../interfaces/Recipe";
export default class RecipeModel {
  public searchResults: Recipe[];
  constructor() {
    this.searchResults = [];
  }
  getRandomRecipes = async function (): Promise<void> {
    try {
      const data = await getJSON(`${API_URL}random?number=5&apiKey=${API_KEY}`);
      this.searchResults = data.recipes;
    } catch (err) {
      throw err;
    }
  };
}
