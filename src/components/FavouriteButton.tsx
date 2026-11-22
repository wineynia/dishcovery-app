"use client";

import { useUserContext } from "@/context/UserContext";

type FavouriteButtonProps = {
  category: string;
};

export function FavouriteButton({ category }: FavouriteButtonProps) {
  const { user, setFavouriteCategory } = useUserContext();
  const isFavourite = user?.favouriteCategory === category;

  return (
    <button
      type="button"
      className={isFavourite ? "button-primary" : "button-secondary"}
      aria-pressed={isFavourite}
      onClick={() => setFavouriteCategory(isFavourite ? null : category)}
    >
      {isFavourite ? "★ Favourite" : "☆ Make favourite"}
    </button>
  );
}