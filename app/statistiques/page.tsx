"use client";

import { DotPattern } from "@/components/magicui/dot-pattern";
import { NavBar } from "@/components/page/NavBar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [totalReports, setTotalReports] = useState(0);
  const [categoriesData, setCategoriesData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [evolutionData, setEvolutionData] = useState([]);

  useEffect(() => {
    fetch("https://express-poukave-api.vercel.app/denonciations")
      .then((response) => response.json())
      .then((data) => {
        setTotalReports(data.length);

        const categoryMap = {};
        data.forEach((report) => {
          categoryMap[report.categorie] =
            (categoryMap[report.categorie] || 0) + 1;
        });
        setCategoriesData(
          Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
        );

        const cityMap = {};
        data.forEach((report) => {
          cityMap[report.localisation] =
            (cityMap[report.localisation] || 0) + 1;
        });
        setCityData(
          Object.entries(cityMap).map(([ville, signalements]) => ({
            ville,
            signalements,
          }))
        );

        // Regrouper les signalements par mois pour l'évolution
        const evolution = {};
        data.forEach((report) => {
          const mois = new Date(report.date).toLocaleString("fr-FR", {
            month: "short",
            year: "numeric",
          });
          evolution[mois] = (evolution[mois] || 0) + 1;
        });
        setEvolutionData(
          Object.entries(evolution).map(([mois, signalements]) => ({
            mois,
            signalements,
          }))
        );
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des données", error)
      );
  }, []);

  const COLORS = ["#FF5733", "#33FF57", "#338DFF", "#FF33A8"];

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
    </div>
  );
}
