"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <DotPattern glow className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />

      <header className="bg-background sticky top-0 z-50 w-full border-b">
        <div className="container flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Poukave</h1>
          <nav className="hidden lg:flex items-center gap-2">
            <Link href="/"><Button variant="ghost" size="sm">Accueil</Button></Link>
            <Button variant="ghost" size="sm">Analyse</Button>
            <Button variant="ghost" size="sm">À propos</Button>
            <Link href="/denoncer">
              <ShimmerButton className="shadow-2xl">
                <span className="text-xs font-medium tracking-tight text-white lg:text-xs">
                  Dénoncer
                </span>
              </ShimmerButton>
            </Link>
          </nav>
          <Button variant="ghost" size="sm" className="lg:hidden"><Menu /></Button>
        </div>
      </header>

      <main className="flex-grow p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mt-8">
          Ça dénonce hein 😉
        </h1>

        <motion.div 
          className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg mt-6 border border-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form className="space-y-5">
            <div>
              <label className="block font-bold mb-1">Pseudonyme <span className="text-red-500">*</span></label>
              <input type="text" name="pseudonyme" value={formData.pseudonyme} onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none" required />
            </div>

            <div>
              <label className="block font-bold mb-1">Catégorie <span className="text-red-500">*</span></label>
              <select name="categorie" value={formData.categorie} onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none" required>
                <option value="">Sélectionnez une catégorie</option>
                <option value="Fraude">Fraude</option>
                <option value="Corruption">Corruption</option>
                <option value="Harcèlement">Harcèlement</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Ville / Région <span className="text-red-500">*</span></label>
              <input type="text" name="ville" value={formData.ville} onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none" required />
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block font-bold mb-1">Mots-clés <span className="text-red-500">*</span></label>
                <input type="text" name="motsCles" value={formData.motsCles} onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none" required />
              </div>
              <div>
                <label className="block font-bold mb-1">Date <span className="text-red-500">*</span></label>
                <input type="date" name="date" value={formData.date} onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none" required />
              </div>
              <div>
                <label className="block font-bold mb-1">Heure <span className="text-red-500">*</span></label>
                <input type="time" name="heure" value={formData.heure} onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none" required />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">Description <span className="text-red-500">*</span></label>
              <textarea name="description" value={formData.description} onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none" required />
            </div>

            {/* Upload Pièces jointes */}
            <div>
              <label className="block font-bold mb-1">Pièces jointes</label>
              <button type="button" className="p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none">
                Ajouter
              </button>
            </div>

            <motion.button type="submit" className="w-full bg-black text-white p-3 rounded-md font-bold"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              DÉNONCERRRRR
            </motion.button>
          </form>
        </motion.div>

        {/* Texte en bas */}
        <div className="mt-8 text-center text-gray-600 space-y-2">
          <p>🔒 <span className="font-semibold">Anonymat garanti</span> : Vos signalements restent totalement anonymes et vos données sont traitées avec la plus grande confidentialité.</p>
          <p>🛡️ <span className="font-semibold">Sécurité renforcée</span> : Toutes les informations sont cryptées et protégées pour assurer votre tranquillité d'esprit.</p>
        </div>
      </main>

      <footer className="bg-background border-t mt-auto">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="font-bold">Poukave</h2>
            <div className="flex gap-4">
              {["Confidentialité", "Conditions d'utilisation", "FAQ", "Contact"].map((link, index) => (
                <a key={index} href="#" className="text-sm text-muted-foreground hover:underline">{link}</a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Poukave. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
