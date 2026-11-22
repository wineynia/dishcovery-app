"use client";

import { fetchRandomMeal } from "@/lib/mealdb";
import { useAsync } from "@/lib/useAsync";
import { LoginForm } from "@/components/LoginForm";
import { RecipeCard } from "@/components/RecipeCard";

export function LoginScreen() {
  const teaser = useAsync(fetchRandomMeal, []);

  return (
    <div className="login-screen">
      <section className="login-card">
        <h1>Dishcovery</h1>
        <p>Log in to browse categories and save your favourite recipes.</p>
        <LoginForm />
      </section>

      <section className="login-teaser" aria-label="Recipe of the moment">
        <h2>Recipe of the moment</h2>
        {teaser.loading && <p>Loading a recipe…</p>}
        {teaser.error && <p className="error">{teaser.error}</p>}
        {teaser.data && (
          <RecipeCard
            id={teaser.data.idMeal}
            name={teaser.data.strMeal}
            thumbnail={teaser.data.strMealThumb}
            subtitle={teaser.data.strCategory ?? undefined}
          />
        )}
      </section>
    </div>
  );
}
