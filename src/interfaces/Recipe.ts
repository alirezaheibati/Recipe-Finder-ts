import Ingredient from "./Ingredients";
export interface Recipe {
  id: number;
  title: string;
  cookingTime: number;
  publisher: string;
  sourceUrl: string;
  image: string;
  summary: string;
  servings: number;
  ingredients: Ingredient[];
  healthScore: number;
  price: number;
  bookmark: boolean;
}
