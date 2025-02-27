"use client";

import { DotPattern } from "@/components/magicui/dot-pattern";
import { NavBar } from "@/components/page/NavBar";
import { motion } from "framer-motion";
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
  });

  const [message, setMessage] = useState(""); // Message de confirm ou err

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const formDataToSend = {
      description: formData.description,
      categorie: formData.categorie,
      localisation: formData.ville,
      name: formData.pseudonyme,
      mots_cles: formData.motsCles.split(",").map((mot) => mot.trim()),
    };

    try {
      const response = await fetch(
        "https://express-poukave-api.vercel.app/denonciations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        }
      );

      if (response.ok) {
        setMessage("🚀 Dénonciation envoyée avec succès !");
        setFormData({
          pseudonyme: "",
          categorie: "",
          ville: "",
          motsCles: "",
          date: "",
          heure: "",
          description: "",
        });
      } else {
        const errorData = await response.json();
        setMessage(`❌ Erreur: ${errorData.message || "Réessayez !"}`);
      }
    } catch (error) {
      setMessage("❌ Erreur de connexion. Vérifiez votre réseau.");
    }
  };

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <DotPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
      <NavBar />
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
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block font-bold mb-1">Pseudonyme *</label>
              <input
                type="text"
                name="pseudonyme"
                value={formData.pseudonyme}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Catégorie *</label>
              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
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
              <label className="block font-bold mb-1">Ville / Région *</label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Mots-clés *</label>
              <input
                type="text"
                name="motsCles"
                value={formData.motsCles}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-md font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              DÉNONCERRRRR
            </motion.button>
          </form>
          {message && (
            <p className="text-center mt-4 font-semibold">{message}</p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
