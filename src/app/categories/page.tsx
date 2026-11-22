"use client";

import Link from "next/link";
import { FavouriteButton } from "@/app/components/FavouriteButton";
import { fetchCategories } from "@/app/lib/mealdb";
import { useAsync } from "@/app/lib/useAsync";

export default function CategoriesPage() {
  const categories = useAsync(fetchCategories, []);

  return (
    <section className="stack">
      <h1>Categories</h1>

      {categories.loading && <p>Loading categories…</p>}
      {categories.error && <p className="error">{categories.error}</p>}

      {categories.data && (
        <ul className="card-grid">
          {categories.data.map((category) => (
            <li key={category.idCategory} className="card">
              <Link
                href={`/categories/${encodeURIComponent(category.strCategory)}`}
                className="card-link"
              >
                <img
                  src={category.strCategoryThumb}
                  alt=""
                  className="card-image"
                  loading="lazy"
                />
                <div className="card-body">
                  <h3>{category.strCategory}</h3>
                  <p className="muted">{category.strCategoryDescription}</p>
                </div>
              </Link>
              <div className="card-actions">
                <FavouriteButton category={category.strCategory} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}