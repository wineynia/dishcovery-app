"use client";

import Link from "next/link";
import { RecipeCard } from "@/components/RecipeCard";
import { useUserContext } from "@/context/UserContext";

export default function ProfilePage() {
  const { user, toggleSavedRecipe } = useUserContext();

  if (!user) {
    return null;
  }

  const savedRecipes = user.savedRecipes;
  const savedCount = savedRecipes.length;

  const categoryCounts = new Map<string, number>();
  for (const recipe of savedRecipes) {
    categoryCounts.set(recipe.category, (categoryCounts.get(recipe.category) ?? 0) + 1);
  }
  const topCategory = [...categoryCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <section className="stack">
      <h1>{user.username}&apos;s profile</h1>
      <p>
        Favourite category: <strong>{user.favouriteCategory ?? "none yet"}</strong>
      </p>

      {savedCount === 0 ? (
        <p>
          Nothing saved yet. <Link href="/categories">Browse categories</Link> to find one.
        </p>
      ) : (
        <>
          <p className="muted">
            You have {savedCount} saved {savedCount === 1 ? "recipe" : "recipes"}
            {topCategory && `, mostly ${topCategory}`}.
          </p>

          <ul className="card-grid">
            {savedRecipes.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard
                  id={recipe.id}
                  name={recipe.name}
                  thumbnail={recipe.thumbnail}
                  subtitle={recipe.category}
                >
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => toggleSavedRecipe(recipe)}
                  >
                    Remove
                  </button>
                </RecipeCard>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}