import { DotPattern } from "@/components/magicui/dot-pattern";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 place-content-between flex justify-items-center flex-col min-h-screen">
      <DotPattern
        glow
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />

      {/* Header */}
      <header className="bg-background place-content-between flex justify-items-center flex-col sticky top-0 z-50 w-full border-b">
        <div className="container flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Poukave</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Menu burger pour mobile */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu />
            </Button>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="sm">Accueil</Button>
              <Button variant="ghost" size="sm">Analyse</Button>
              <Button variant="ghost" size="sm">À propos</Button>
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

      {/* Hero Section */}
      <section className=" place-content-between flex justify-items-center flex-col container py-12 sm:py-16 space-y-6 md:space-y-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Poukave - Signalez pour un avenir meilleur
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Une plateforme anonyme et sécurisée pour signaler les problèmes
            sociaux, environnementaux et civiques qui affectent notre
            communauté.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Faire un signalement</Button>
            <Button size="lg" variant="outline">
              Voir les analyses
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className=" place-content-between flex justify-items-center flex-col container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Anonymat Garanti",
              description:
                "Signalez en toute confidentialité sans crainte de représailles.",
              content:
                "Notre plateforme est conçue pour protéger votre identité tout en permettant de transmettre des informations cruciales.",
              buttonText: "En savoir plus",
            },
            {
              title: "Impact Concret",
              description:
                "Vos signalements contribuent à des changements réels.",
              content:
                "Grâce à la visualisation des données et à la transparence, les autorités peuvent agir efficacement sur les problèmes signalés.",
              buttonText: "Voir les résultats",
            },
            {
              title: "Facilité d'Utilisation",
              description:
                "Un processus simple et rapide pour soumettre vos signalements.",
              content:
                "Notre formulaire intuitif vous permet de déposer un signalement en quelques minutes, avec la possibilité d'ajouter des détails précis.",
              buttonText: "Comment ça marche",
            },
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.content}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  {feature.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Tabs Section */}
      <section className=" place-content-between flex justify-items-center flex-col container py-8 md:py-12">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
          Comment utiliser Poukave
        </h2>
        <Tabs defaultValue="signaler" className="max-w-xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
            <TabsTrigger value="signaler">Signaler</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="analyse">Analyse</TabsTrigger>
          </TabsList>
          {[
            {
              value: "signaler",
              title: "Comment faire un signalement",
              description:
                "Cliquez sur le bouton 'Dénoncer', remplissez le formulaire avec une description du problème, sa catégorie et sa localisation, puis soumettez-le de manière anonyme.",
              buttonText: "Faire un signalement maintenant",
            },
            {
              value: "categories",
              title: "Nos catégories de signalement",
              description:
                "Fraude, corruption, pollution environnementale, problèmes d'infrastructure, incivilités, et bien plus. Choisissez la catégorie qui correspond le mieux au problème.",
              buttonText: "Voir toutes les catégories",
            },
            {
              value: "analyse",
              title: "Comprendre les données",
              description:
                "Consultez notre page d'analyse pour voir les statistiques, la répartition par catégorie, et les zones géographiques les plus signalées. Des graphiques interactifs sont disponibles.",
              buttonText: "Consulter les analyses",
            },
          ].map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="mt-4 p-4 border rounded-lg"
            >
              <h3 className="text-lg font-medium mb-2">{tab.title}</h3>
              <p className="text-muted-foreground mb-4">{tab.description}</p>
              <Button>{tab.buttonText}</Button>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className=" place-content-between flex justify-items-center flex-col bg-muted py-8 md:py-12">
        <div className="container">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Ensemble, créons une communauté plus transparente
            </h2>
            <p className="text-muted-foreground mb-6">
              Votre vigilance et vos signalements sont essentiels pour améliorer
              notre société. Rejoignez notre mouvement pour plus de transparence
              et de responsabilité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Faire un signalement</Button>
              <Button size="lg" variant="outline">
                Consulter les ressources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=" place-content-between flex justify-items-center flex-col bg-background border-t mt-auto">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <h2 className="font-bold">Poukave</h2>
            </div>
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
              © 2025 Poukave. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
