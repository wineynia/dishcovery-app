const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string | null;
};

export type Meal = MealSummary & {
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  [key: string]: string | null | undefined;
};

export type Ingredient = {
  name: string;
  measure: string;
};

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${path}`);

  if (!response.ok) {
    throw new Error(`TheMealDB request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await getJson<{ categories: Category[] | null }>("categories.php");
  return data.categories ?? [];
}

export async function fetchMealsByCategory(category: string): Promise<MealSummary[]> {
  const data = await getJson<{ meals: MealSummary[] | null }>(
    `filter.php?c=${encodeURIComponent(category)}`,
  );
  return data.meals ?? [];
}

export async function fetchMealById(id: string): Promise<Meal | null> {
  const data = await getJson<{ meals: Meal[] | null }>(
    `lookup.php?i=${encodeURIComponent(id)}`,
  );
  return data.meals?.[0] ?? null;
}

export async function fetchRandomMeal(): Promise<Meal | null> {
  const data = await getJson<{ meals: Meal[] | null }>("random.php");
  return data.meals?.[0] ?? null;
}

export async function fetchRandomMealFromCategory(
  category: string,
): Promise<MealSummary | null> {
  const meals = await fetchMealsByCategory(category);

  if (meals.length === 0) {
    return null;
  }

  return meals[Math.floor(Math.random() * meals.length)];
}

export function getIngredients(meal: Meal): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let index = 1; index <= 20; index++) {
    const name = meal[`strIngredient${index}`]?.trim();
    const measure = meal[`strMeasure${index}`]?.trim() ?? "";

    if (name) {
      ingredients.push({ name, measure });
    }
  }

  return ingredients;
}
