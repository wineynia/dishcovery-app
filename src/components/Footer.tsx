import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} Dishcovery by Gabriella Arif. Recipe data from{" "}
        <Link href="https://www.themealdb.com" target="_blank" rel="noreferrer">
          TheMealDB
        </Link>
        .
      </p>
    </footer>
  );
}