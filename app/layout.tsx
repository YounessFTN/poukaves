import { NavBar } from "@/components/page/NavBar";
import { Geist, Geist_Mono } from "next/font/google";
import { FC } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Poukave - Signaler pour un avenir meilleur",
  description:
    "Plateforme anonyme et sécurisée pour signaler des problèmes sociaux, environnementaux et civiques.",
  icons: {
    icon: "/logo-poukave.svg", // Remplace par le bon chemin vers ton fichier
  },
};

/**
 * The root layout of the application.
 *
 * This component is responsible for rendering the HTML shell of the
 * application, including the `<html>` and `<body>` tags. It should be
 * used as the top-level component in the `App.jsx` file.
 *
 * @param children The content to be rendered within the layout.
 * @returns The rendered HTML.
 */
const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {<NavBar />}
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
