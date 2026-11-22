"use client";

import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import { fetchRandomMeal, fetchRandomMealFromCategory, type MealSummary } from "@/lib/mealdb";
import { useAsync } from "@/lib/useAsync";
import { RecipeCard } from "@/components/RecipeCard";

export default function HomePage() {
  const { user } = useUserContext();

  if (!user) {
    return null;
  }

  return (
    <section className="stack">
      <h1>Hi {user.username}</h1>
      <p>
        {user.favouriteCategory
          ? `Here is a recipe from your favourite category, ${user.favouriteCategory}.`
          : "You have no favourite category yet, so here is a random recipe."}
      </p>

      <PersonalisedRecipe favouriteCategory={user.favouriteCategory} />

      <p>
        <Link href="/categories" className="button-secondary">
          Browse categories
        </Link>
      </p>
    </section>
  );
}

function PersonalisedRecipe({ favouriteCategory }: { favouriteCategory: string | null }) {
  const recipe = useAsync<MealSummary | null>(
    async () =>
      favouriteCategory
        ? fetchRandomMealFromCategory(favouriteCategory)
        : fetchRandomMeal(),
    [favouriteCategory],
  );

  if (recipe.loading) {
    return <p>Loading a recipe…</p>;
  }

  if (recipe.error) {
    return <p className="error">{recipe.error}</p>;
  }

  if (!recipe.data) {
    return <p>No recipes found.</p>;
  }

  return (
    <RecipeCard
      id={recipe.data.idMeal}
      name={recipe.data.strMeal}
      thumbnail={recipe.data.strMealThumb}
      subtitle={favouriteCategory ?? undefined}
    />
  );
}
