"use client";

import { DotPattern } from "@/components/magicui/dot-pattern";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Denoncer() {
  const [formData, setFormData] = useState({
    pseudonyme: "",
    categorie: "",
    ville: "",
    motsCles: "",
    date: "",
    heure: "",
    description: "",
    fichier: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <DotPattern
        glow
        className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
      />

      <header className="bg-background sticky top-0 z-50 w-full border-b">
        <div className="container flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Poukave</h1>
          <nav className="hidden lg:flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Accueil
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              Analyse
            </Button>
            <Button variant="ghost" size="sm">
              À propos
            </Button>
            <Link href="/denoncer">
              <ShimmerButton className="shadow-2xl">
                <span className="text-xs font-medium tracking-tight text-white lg:text-xs">
                  Dénoncer
                </span>
              </ShimmerButton>
            </Link>
          </nav>
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu />
          </Button>
        </div>
      </header>

      <main className="flex-grow p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mt-8">
          {"Ça dénonce hein 😉"}
        </h1>

        <motion.div
          className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg mt-6 border border-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form className="space-y-5">
            <div>
              <label className="block font-bold mb-1">
                Pseudonyme <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pseudonyme"
                value={formData.pseudonyme}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1">
                Catégorie <span className="text-red-500">*</span>
              </label>
              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none"
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="Fraude">Fraude</option>
                <option value="Corruption">Corruption</option>
                <option value="Harcèlement">Harcèlement</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">
                Ville / Région <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none"
                required
              />
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block font-bold mb-1">
                  Mots-clés <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="motsCles"
                  value={formData.motsCles}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none"
                  required
                />
              </div>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
