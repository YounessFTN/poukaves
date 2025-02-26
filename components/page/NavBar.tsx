import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export function NavBar() {
  return (
    <>
      {" "}
      {/* Header */}
      <header className="bg-background place-content-between flex justify-items-center flex-col sticky top-0 z-50 w-full border-b">
        <div className="container flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Poukave</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Menu burger pour mobile */}
            <Link href="/">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu />
              </Button>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  Accueil
                </Button>
              </Link>
              <Link href="/statistiques">
                <Button variant="ghost" size="sm">
                  Analyse
                </Button>
              </Link>
              <Link href="/denoncer">
                <Button variant="ghost" size="sm">
                  À propos
                </Button>
              </Link>
              <Link href="/denoncer">
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-xs font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-xs">
                    Dénoncer
                  </span>
                </ShimmerButton>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
