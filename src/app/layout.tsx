import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { UserProvider } from "@/app/context/UserContext";
import { LogInWrapper } from "@/app/components/LogInWrappers";

export const metadata: Metadata = {
  title: "Dishcovery",
  description: "Browse TheMealDB categories and save your favourite recipes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <LogInWrapper>{children}</LogInWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
