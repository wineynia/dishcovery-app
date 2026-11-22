"use client";

import type { ReactNode } from "react";
import { useUserContext } from "@/context/UserContext";
import { Header } from "@/components/Header";
import { LoginScreen } from "@/components/LoginScreen";

export function LogInWrapper({ children }: { children: ReactNode }) {
  const { user } = useUserContext();

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <>
      <Header />
      <main className="page">{children}</main>
    </>
  );
}
