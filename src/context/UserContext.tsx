"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { SavedRecipe, User } from "@/lib/types";

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  setFavouriteCategory: (category: string | null) => void;
  toggleSavedRecipe: (recipe: SavedRecipe) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const setFavouriteCategory = (category: string | null) => {
    setUser((previous) =>
      previous ? { ...previous, favouriteCategory: category } : previous,
    );
  };

  const toggleSavedRecipe = (recipe: SavedRecipe) => {
    setUser((previous) => {
      if (!previous) {
        return previous;
      }

      const isSaved = previous.savedRecipes.some((saved) => saved.id === recipe.id);
      const savedRecipes = isSaved
        ? previous.savedRecipes.filter((saved) => saved.id !== recipe.id)
        : [...previous.savedRecipes, recipe];

      return { ...previous, savedRecipes };
    });
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, setFavouriteCategory, toggleSavedRecipe }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useUserContext must be used inside a UserProvider");
  }

  return context;
}
