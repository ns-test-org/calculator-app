export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  tags: string[];
  nutrition: NutritionInfo;
  rating: number;
  ratingCount: number;
  imageUrl?: string;
  createdAt: string;
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  category: 'protein' | 'vegetable' | 'grain' | 'dairy' | 'spice' | 'other';
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  sugar: number; // in grams
}

export interface RecipeSearchParams {
  ingredients?: string[];
  cuisine?: string;
  maxPrepTime?: number;
  maxCookTime?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  minRating?: number;
  maxCalories?: number;
  page?: number;
  limit?: number;
}

export interface RecipeSearchResponse {
  recipes: Recipe[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface RecipeRating {
  recipeId: string;
  rating: number;
  comment?: string;
  userId?: string;
  createdAt: string;
}
