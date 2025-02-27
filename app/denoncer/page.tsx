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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      name: formData.pseudonyme || "Anonyme",
      categorie: formData.categorie,
      localisation: formData.ville,
      description: formData.description,
      date: `${formData.date}T${formData.heure}:00.000Z`,
      mots_cles: formData.motsCles.split(",").map((mot) => mot.trim()), // Transforme en tableau
    };

    try {
      const response = await fetch("https://express-poukave-api.vercel.app/denonciations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire.");
      }

      const result = await response.json();
      setMessage("Dénonciation envoyée avec succès !");
      setFormData({
        pseudonyme: "",
        categorie: "",
        ville: "",
        motsCles: "",
        date: "",
        heure: "",
        description: "",
      });
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <DotPattern
        glow
        className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
      />

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
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  Mots-clés (séparés par des virgules) <span className="text-red-500">*</span>
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
              <div>
                <label className="block font-bold mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-1">
                  Heure <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="heure"
                  value={formData.heure}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md focus:border-black focus:ring-black outline-none"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-md font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "DÉNONCERRRRR"}
            </motion.button>
          </form>
          {message && <p className="text-center text-green-600 mt-4">{message}</p>}
        </motion.div>
      </main>
    </div>
  );
}
