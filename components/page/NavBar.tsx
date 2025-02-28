"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/statistiques", label: "Analyse" },
  ];

  return (
    <header className="flex items-center justify-between sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center justify-between mx-auto p-4">
        {" "}
        {/* Centrage ici */}
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <h1 className="text-xl font-bold">Poukave</h1>
          </Link>
        </div>
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <Button variant="ghost" size="sm">
                {link.label}
              </Button>
            </Link>
          ))}
          <Link href="/denoncer">
            <ShimmerButton className="shadow-md">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                Dénoncer
              </span>
            </ShimmerButton>
          </Link>
        </nav>
        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="absolute left-0 top-full z-50 w-full bg-background shadow-lg lg:hidden">
            <nav className="flex flex-col space-y-2 p-4">
              {navLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Link href="/denoncer" className="mt-4">
                <ShimmerButton
                  className="w-full shadow-md"
                  onClick={toggleMenu}
                >
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
                    Dénoncer
                  </span>
                </ShimmerButton>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
