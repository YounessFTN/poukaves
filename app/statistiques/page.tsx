"use client";

import { DotPattern } from "@/components/magicui/dot-pattern";
import { NavBar } from "@/components/page/NavBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [loading, setLoading] = useState(true);
  const [totalReports, setTotalReports] = useState(0);
  const [categoriesData, setCategoriesData] = useState<
    { name: string; value: number }[]
  >([]);
  const [cityData, setCityData] = useState<
    { ville: string; signalements: number }[]
  >([]);
  const [evolutionData, setEvolutionData] = useState<
    { mois: string; signalements: number }[]
  >([]);
  const [reports, setReports] = useState<
    {
      categorie: string;
      localisation: string;
      date: string;
      description: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("https://express-poukave-api.vercel.app/denonciations")
      .then((response) => response.json())
      .then((data) => {
        setTotalReports(data.length);
        setReports(data);

        const categoryMap: { [key: string]: number } = {};
        data.forEach(
          (report: {
            categorie: string;
            localisation: string;
            date: string;
          }) => {
            categoryMap[report.categorie] =
              (categoryMap[report.categorie] || 0) + 1;
          }
        );
        setCategoriesData(
          Object.entries(categoryMap)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
        );

        const cityMap: { [key: string]: number } = {};
        data.forEach(
          (report: {
            categorie: string;
            localisation: string;
            date: string;
          }) => {
            cityMap[report.localisation] =
              (cityMap[report.localisation] || 0) + 1;
          }
        );
        setCityData(
          Object.entries(cityMap)
            .map(([ville, signalements]) => ({
              ville,
              signalements,
            }))
            .sort((a, b) => b.signalements - a.signalements)
        );

        // Regrouper les signalements par mois pour l'évolution
        const evolution: { [key: string]: number } = {};
        data.forEach(
          (report: {
            categorie: string;
            localisation: string;
            date: string;
          }) => {
            const mois = new Date(report.date).toLocaleString("fr-FR", {
              month: "short",
              year: "numeric",
            });
            evolution[mois] = (evolution[mois] || 0) + 1;
          }
        );

        // Sort evolution data chronologically
        const sortedMonths = Object.keys(evolution).sort((a, b) => {
          const dateA = new Date(a.replace(/^\w+\s/, "01 "));
          const dateB = new Date(b.replace(/^\w+\s/, "01 "));
          return dateA.getTime() - dateB.getTime();
        });

        setEvolutionData(
          sortedMonths.map((mois) => ({
            mois,
            signalements: evolution[mois],
          }))
        );

        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données", error);
        setLoading(false);
      });
  }, []);

  const COLORS = [
    "#4CAF50",
    "#03A9F4",
    "#FFC107",
    "#8BC34A",
    "#F44336",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
  ];

  const getCategoryColor = (category: string) => {
    const index = categoriesData.findIndex((item) => item.name === category);
    return index >= 0 ? COLORS[index % COLORS.length] : "#gray";
  };

  const LoadingState = () => (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full max-w-xs mx-auto" />
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="h-52 w-full" />
        <Skeleton className="h-52 w-full" />
      </div>
      <Skeleton className="h-52 w-full" />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DotPattern
        glow
        className="fixed inset-0 opacity-50 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
      />
      <NavBar />
      <main className="flex-grow container mx-auto px-3 py-4 sm:px-4 sm:py-8 relative z-10">
        <motion.h1
          className="text-2xl sm:text-4xl font-bold text-center mt-4 mb-6 sm:mt-8 sm:mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          📊 Statistiques des Signalements
        </motion.h1>

        {loading ? (
          <LoadingState />
        ) : (
          <>
            <motion.div
              className="max-w-xs sm:max-w-lg mx-auto mb-6 sm:mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-2 border-primary/20 shadow-md">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl mr-3 sm:mr-4">
                      🚨
                    </span>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        {totalReports}
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        signalements enregistrés
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 mb-6 sm:gap-8 sm:mb-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="shadow-md border-2 border-primary/10">
                  <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
                    <CardTitle className="text-lg sm:text-xl flex items-center">
                      <span className="mr-2">📌</span> Répartition par Catégorie
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-6">
                    <div className="h-56 sm:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoriesData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${
                                name.length > 10
                                  ? name.substring(0, 10) + "..."
                                  : name
                              }: ${(percent * 100).toFixed(0)}%`
                            }
                            labelLine={false}
                          >
                            {categoriesData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value, name) => [
                              `${value} signalements`,
                              name,
                            ]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center">
                      {categoriesData.slice(0, 3).map((category, index) => (
                        <Badge
                          key={index}
                          className="text-xs whitespace-nowrap"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        >
                          {category.name.length > 12
                            ? category.name.substring(0, 12) + "..."
                            : category.name}
                          : {category.value}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="shadow-md border-2 border-primary/10">
                  <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
                    <CardTitle className="text-lg sm:text-xl flex items-center">
                      <span className="mr-2">🏙️</span> Top Localisations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-6">
                    <div className="overflow-x-auto -mx-2 px-2">
                      <table className="w-full text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Ville</th>
                            <th className="text-right py-2">Signalements</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cityData.slice(0, 5).map((city, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-1.5 sm:py-2">{city.ville}</td>
                              <td className="text-right py-1.5 sm:py-2 font-medium">
                                {city.signalements}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              className="mb-6 sm:mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="shadow-md border-2 border-primary/10">
                <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
                  <CardTitle className="text-lg sm:text-xl flex items-center">
                    <span className="mr-2">📈</span> Évolution des Signalements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-6">
                  <div className="h-48 sm:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={evolutionData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
                      >
                        <XAxis
                          dataKey="mois"
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          tick={{ fontSize: 10 }}
                          tickFormatter={(value) => {
                            // For mobile, shorten the month names
                            const parts = value.split(" ");
                            if (parts.length === 2) {
                              return `${parts[0].substring(0, 3)} ${parts[1]}`;
                            }
                            return value;
                          }}
                        />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip
                          formatter={(value) => [
                            `${value} signalements`,
                            "Total",
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="signalements"
                          stroke="#FF5733"
                          strokeWidth={2}
                          dot={{ stroke: "#FF5733", strokeWidth: 2, r: 3 }}
                          activeDot={{
                            stroke: "#FF5733",
                            strokeWidth: 2,
                            r: 5,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="shadow-md border-2 border-primary/10">
                <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
                  <CardTitle className="text-lg sm:text-xl flex items-center">
                    <span className="mr-2">📍</span> Détails des Signalements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-6">
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-4 overflow-x-auto flex whitespace-nowrap max-w-full pb-1">
                      <TabsTrigger
                        value="all"
                        className="text-xs sm:text-sm px-2 sm:px-4"
                      >
                        Tous
                      </TabsTrigger>
                      {categoriesData.slice(0, 3).map((cat, idx) => (
                        <TabsTrigger
                          key={idx}
                          value={cat.name}
                          className="text-xs sm:text-sm px-2 sm:px-4"
                        >
                          {cat.name.length > 10
                            ? cat.name.substring(0, 10) + "..."
                            : cat.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <TabsContent value="all" className="mt-0">
                      <div className="overflow-x-auto -mx-2 px-2">
                        <table className="w-full border-collapse text-xs sm:text-sm">
                          <thead>
                            <tr className="bg-gray-100 text-gray-700">
                              <th className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 text-left">
                                Ville
                              </th>
                              <th className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 text-left">
                                Cat.
                              </th>
                              <th className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 text-left">
                                Date
                              </th>
                              <th className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 text-left">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.slice(0, 10).map((report, index) => (
                              <tr
                                key={index}
                                className="hover:bg-gray-50 border-b border-gray-100"
                              >
                                <td className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2">
                                  {report.localisation.length > 12
                                    ? report.localisation.substring(0, 12) +
                                      "..."
                                    : report.localisation}
                                </td>
                                <td className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2">
                                  <Badge
                                    className="font-normal text-2xs sm:text-xs px-1.5"
                                    style={{
                                      backgroundColor: getCategoryColor(
                                        report.categorie
                                      ),
                                      color: "white",
                                    }}
                                  >
                                    {report.categorie.length > 8
                                      ? report.categorie.substring(0, 8) + "..."
                                      : report.categorie}
                                  </Badge>
                                </td>
                                <td className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2">
                                  {new Date(report.date).toLocaleDateString(
                                    "fr-FR",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "2-digit",
                                    }
                                  )}
                                </td>
                                <td className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 truncate max-w-32 sm:max-w-none">
                                  {report.description.length > 20
                                    ? report.description.substring(0, 20) +
                                      "..."
                                    : report.description}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    {categoriesData.slice(0, 3).map((category, idx) => (
                      <TabsContent
                        key={idx}
                        value={category.name}
                        className="mt-0"
                      >
                        <div className="overflow-x-auto -mx-2 px-2">
                          <table className="w-full border-collapse text-xs sm:text-sm">
                            <thead>
                              <tr className="bg-gray-100 text-gray-700">
                                <th className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 text-left">
                                  Ville
                                </th>
                                <th className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 text-left">
                                  Date
                                </th>
                                <th className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 text-left">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {reports
                                .filter(
                                  (report) => report.categorie === category.name
                                )
                                .slice(0, 8)
                                .map((report, index) => (
                                  <tr
                                    key={index}
                                    className="hover:bg-gray-50 border-b border-gray-100"
                                  >
                                    <td className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2">
                                      {report.localisation.length > 12
                                        ? report.localisation.substring(0, 12) +
                                          "..."
                                        : report.localisation}
                                    </td>
                                    <td className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2">
                                      {new Date(report.date).toLocaleDateString(
                                        "fr-FR",
                                        {
                                          day: "2-digit",
                                          month: "2-digit",
                                          year: "2-digit",
                                        }
                                      )}
                                    </td>
                                    <td className="border border-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 truncate max-w-32 sm:max-w-none">
                                      {report.description.length > 20
                                        ? report.description.substring(0, 20) +
                                          "..."
                                        : report.description}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </main>
      <footer className="bg-white border-t mt-auto w-full py-4 sm:py-6 px-4 sm:px-6 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} Poukave. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
