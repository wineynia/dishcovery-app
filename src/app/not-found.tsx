import Link from "next/link";

export default function NotFound() {
  return (
    <section className="stack">
      <h1>Page not found</h1>
      <p>That page doesn&apos;t exist.</p>
      <Link href="/" className="button-secondary">
        Back to home
      </Link>
    </section>
  );
}