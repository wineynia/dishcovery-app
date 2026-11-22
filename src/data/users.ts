import type { User } from "@/lib/types";

type UserAccount = User & { password: string };

const accounts: UserAccount[] = [
  {
    username: "gabriella",
    password: "cook123",
    favouriteCategory: "Dessert",
    savedRecipes: [],
  },
  {
    username: "sam",
    password: "seafood456",
    favouriteCategory: "Seafood",
    savedRecipes: [],
  },
  {
    username: "alex",
    password: "pasta789",
    favouriteCategory: null,
    savedRecipes: [],
  },
];

export function findUser(username: string, password: string): User | null {
  const normalisedName = username.trim().toLowerCase();
  const account = accounts.find(
    (candidate) =>
      candidate.username.toLowerCase() === normalisedName &&
      candidate.password === password,
  );

  if (!account) {
    return null;
  }

  return {
    username: account.username,
    favouriteCategory: account.favouriteCategory,
    savedRecipes: [...account.savedRecipes],
  };
}
