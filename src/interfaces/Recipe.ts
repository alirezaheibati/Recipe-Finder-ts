export interface Recipe {
  id: number;
  title: string;
  cookingTime: number;
  readyInMinutes: number;
  publisher: string;
  sourceUrl: string;
  image: string;
  summary: string;
  servings: number;
  ingredients: string[];
  healthScore: number;
  price: number;
}
