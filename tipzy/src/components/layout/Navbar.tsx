"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (href: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      pathname === href ? "text-[--color-primary]" : "text-[--color-text]/80 hover:text-[--color-primary]"
    }`;

  return (
    <header className={`sticky top-0 z-40 backdrop-blur ${isScrolled ? "shadow-sm" : ""}`}>
      <div className="mx-auto w-full container-max px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[--color-primary] text-white font-bold">Tz</span>
            <span className="text-lg font-semibold">Tipzy</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/dashboard/venue" className={linkClass("/dashboard/venue")}>
              Dashboard
            </Link>
            <Link href="/profile" className={linkClass("/profile")}>Profile</Link>
            <Link href="/login" className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-[--color-primary] text-white hover:opacity-95">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}


