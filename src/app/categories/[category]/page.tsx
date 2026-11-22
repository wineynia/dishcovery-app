"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { RecipeCard } from "@/components/RecipeCard";
import { fetchMealsByCategory } from "@/lib/mealdb";
import { useAsync } from "@/lib/useAsync";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const meals = useAsync(() => fetchMealsByCategory(category), [category]);

  return (
    <section className="stack">
      <p>
        <Link href="/categories">← All categories</Link>
      </p>
      <h1>{category}</h1>

      {meals.loading && <p>Loading recipes…</p>}
      {meals.error && <p className="error">{meals.error}</p>}

      {meals.data && (
        <>
          <p className="muted">
            {meals.data.length} {meals.data.length === 1 ? "recipe" : "recipes"} in this category.
          </p>
          <ul className="card-grid">
            {meals.data.map((meal) => (
              <li key={meal.idMeal}>
                <RecipeCard
                  id={meal.idMeal}
                  name={meal.strMeal}
                  thumbnail={meal.strMealThumb}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}