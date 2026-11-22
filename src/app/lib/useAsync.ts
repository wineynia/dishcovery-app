"use client";

import { useEffect, useState } from "react";

export type AsyncState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function useAsync<T>(load: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let ignore = false;
    setState({ data: null, error: null, loading: true });

    load()
      .then((data) => {
        if (!ignore) {
          setState({ data, error: null, loading: false });
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          setState({
            data: null,
            error: err instanceof Error ? err.message : "Something went wrong",
            loading: false,
          });
        }
      });

    return () => {
      ignore = true;
    };
  }, deps);

  return state;
}
