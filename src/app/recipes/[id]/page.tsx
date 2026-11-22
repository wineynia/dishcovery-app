"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { SaveButton } from "@/components/SaveButton";
import { fetchMealById, getIngredients } from "@/lib/mealdb";
import { useAsync } from "@/lib/useAsync";

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const recipe = useAsync(() => fetchMealById(id), [id]);

  if (recipe.loading) {
    return <p>Loading recipe…</p>;
  }

  if (recipe.error) {
    return <p className="error">{recipe.error}</p>;
  }

  if (!recipe.data) {
    return (
      <section className="stack">
        <h1>Recipe not found</h1>
        <Link href="/categories">Back to categories</Link>
      </section>
    );
  }

  const meal = recipe.data;
  const ingredients = getIngredients(meal);
  const steps = (meal.strInstructions ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (
    <article className="stack recipe">
      <p>
        <Link href={`/categories/${encodeURIComponent(meal.strCategory ?? "")}`}>
          ← Back to {meal.strCategory ?? "categories"}
        </Link>
      </p>

      <h1>{meal.strMeal}</h1>
      <p className="muted">
        {[meal.strCategory, meal.strArea].filter(Boolean).join(" · ")}
      </p>

      {meal.strMealThumb && (
        <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image" />
      )}

      <div>
        <SaveButton
          recipe={{
            id: meal.idMeal,
            name: meal.strMeal,
            thumbnail: meal.strMealThumb,
            category: meal.strCategory ?? "Uncategorised",
          }}
        />
      </div>

      {meal.strTags && (
        <p className="muted">Tags: {meal.strTags.split(",").join(", ")}</p>
      )}

      <section>
        <h2>Ingredients</h2>
        <ul className="ingredients">
          {ingredients.map((ingredient) => (
            <li key={ingredient.name}>
              <span>{ingredient.name}</span>
              <span className="muted">{ingredient.measure}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Instructions</h2>
        {steps.map((step, index) => (
          <p key={index}>{step}</p>
        ))}
      </section>

      <section className="links">
        {meal.strYoutube && (
          <a href={meal.strYoutube} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
        )}
        {meal.strSource && (
          <a href={meal.strSource} target="_blank" rel="noreferrer">
            Original source
          </a>
        )}
      </section>
    </article>
  );
}