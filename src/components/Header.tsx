"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/profile", label: "Profile" },
];

export function Header() {
  const { user, setUser } = useUserContext();
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        Dishcovery
      </Link>

      <nav aria-label="Main">
        <ul className="nav-list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-user">
        <span>Hi {user?.username}</span>
        <button type="button" className="button-secondary" onClick={() => setUser(null)}>
          Log out
        </button>
      </div>
    </header>
  );
}
