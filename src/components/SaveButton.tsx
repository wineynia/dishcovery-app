"use client";

import { useUserContext } from "@/context/UserContext";
import type { SavedRecipe } from "@/lib/types";

type SaveButtonProps = {
  recipe: SavedRecipe;
};

export function SaveButton({ recipe }: SaveButtonProps) {
  const { user, toggleSavedRecipe } = useUserContext();
  const isSaved = user?.savedRecipes.some((saved) => saved.id === recipe.id) ?? false;

  return (
    <button
      type="button"
      className={isSaved ? "button-secondary" : "button-primary"}
      aria-pressed={isSaved}
      onClick={() => toggleSavedRecipe(recipe)}
    >
      {isSaved ? "Remove from saved" : "Save recipe"}
    </button>
  );
}