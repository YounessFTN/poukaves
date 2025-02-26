"use client";

import { DotPattern } from "@/components/magicui/dot-pattern";
import { NavBar } from "@/components/page/NavBar";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export default function Statistiques() {
  const [totalReports, setTotalReports] = useState(15432);
  const categoriesData = [
    { name: "Fraude", value: 40 },
    { name: "Corruption", value: 30 },
    { name: "Harcèlement", value: 20 },
    { name: "Autre", value: 10 },
  ];
  const COLORS = ["#FF5733", "#33FF57", "#338DFF", "#FF33A8"];

  const cityData = [
    { ville: "Paris", signalements: 300 },
    { ville: "Lyon", signalements: 150 },
    { ville: "Lille", signalements: 75 },
  ];

  const evolutionData = [
    { mois: "Jan", signalements: 500 },
    { mois: "Fév", signalements: 750 },
    { mois: "Mar", signalements: 900 },
    { mois: "Avr", signalements: 1200 },
  ];

  const latestReports = [
    { categorie: "Fraude", ville: "Paris", date: "24/02/2025", anonyme: "Oui" },
    {
      categorie: "Corruption",
      ville: "Lyon",
      date: "20/02/2025",
      anonyme: "Non",
    },
    {
      categorie: "Harcèlement",
      ville: "Lille",
      date: "18/02/2025",
      anonyme: "Oui",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <DotPattern
        glow
        className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
      />

      <NavBar />

      <main className="flex-grow p-6">
        <h1 className="text-4xl font-bold text-center mt-8">
          📊 Statistiques des Signalements
        </h1>

        <motion.div
          className="w-full max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg mt-6 border border-gray-300 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">
            🚨 {totalReports} signalements enregistrés
          </h2>
        </motion.div>

        <div className="w-full mt-8">
          <h2 className="text-2xl font-bold text-center">
            📌 Répartition par Catégorie
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoriesData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                dataKey="value"
              >
                {categoriesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full mt-8">
          <h2 className="text-2xl font-bold text-center">
            📍 Signalements par Ville
          </h2>
          <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Ville</th>
                <th className="border px-4 py-2">Nombre de Signalements</th>
              </tr>
            </thead>
            <tbody>
              {cityData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{item.ville}</td>
                  <td className="border px-4 py-2">{item.signalements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full mt-8">
          <h2 className="text-2xl font-bold text-center">
            📈 Évolution des Signalements
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evolutionData}>
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="signalements"
                stroke="#FF5733"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>

      <footer className="bg-background border-t mt-auto w-full">
        <div className="py-6 px-6 flex flex-col md:flex-row justify-between items-center">
          <h2 className="font-bold">Poukave</h2>
          <div className="flex gap-4">
            {[
              "Confidentialité",
              "Conditions d'utilisation",
              "FAQ",
              "Contact",
            ].map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Poukave. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
