"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section className="stack">
      <h1>Something went wrong</h1>
      <p className="error">{error.message}</p>
      <button type="button" className="button-primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}