export type SavedRecipe = {
  id: string;
  name: string;
  thumbnail: string | null;
  category: string;
};

export type User = {
  username: string;
  favouriteCategory: string | null;
  savedRecipes: SavedRecipe[];
};
