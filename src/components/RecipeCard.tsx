import Link from "next/link";
import type { ReactNode } from "react";

type RecipeCardProps = {
  id: string;
  name: string;
  thumbnail: string | null;
  subtitle?: string;
  children?: ReactNode;
};

export function RecipeCard({ id, name, thumbnail, subtitle, children }: RecipeCardProps) {
  return (
    <article className="card">
      <Link href={`/recipes/${id}`} className="card-link">
        {thumbnail && <img src={thumbnail} alt="" className="card-image" loading="lazy" />}
        <div className="card-body">
          <h3>{name}</h3>
          {subtitle && <p className="muted">{subtitle}</p>}
        </div>
      </Link>
      {children && <div className="card-actions">{children}</div>}
    </article>
  );
}