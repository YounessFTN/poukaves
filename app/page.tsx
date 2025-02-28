import { DotPattern } from "@/components/magicui/dot-pattern";
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

      {/* Hero Section */}
      <section className="place-content-between flex justify-items-center flex-col container py-8 sm:py-16 space-y-4 md:space-y-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-4xl">
            Poukave - Signalez pour un avenir meilleur
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
            Une plateforme anonyme et sécurisée pour signaler les problèmes
            sociaux, environnementaux et civiques qui affectent notre
            communauté.
          </p>
          <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/denoncer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Faire un signalement
              </Button>
            </Link>
            <Link href="/statistiques" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Voir les analyses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="place-content-between flex justify-items-center flex-col container py-6 md:py-12">
        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Anonymat Garanti",
              description:
                "Signalez en toute confidentialité sans crainte de représailles.",
              content:
                "Notre plateforme est conçue pour protéger votre identité tout en permettant de transmettre des informations cruciales.",
              buttonText: "En savoir plus",
              href: "/a-propos#anonymat",
            },
            {
              title: "Impact Concret",
              description:
                "Vos signalements contribuent à des changements réels.",
              content:
                "Grâce à la visualisation des données et à la transparence, les autorités peuvent agir efficacement sur les problèmes signalés.",
              buttonText: "Voir les résultats",
              href: "/statistiques",
            },
            {
              title: "Facilité d'Utilisation",
              description:
                "Un processus simple et rapide pour soumettre vos signalements.",
              content:
                "Notre formulaire intuitif vous permet de déposer un signalement en quelques minutes, avec la possibilité d'ajouter des détails précis.",
              buttonText: "Comment ça marche",
              href: "/guide",
            },
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                <p className="text-xs md:text-sm text-muted-foreground">
                  {feature.content}
                </p>
              </CardContent>
              <CardFooter className="p-4 md:p-6">
                <Link href={feature.href} className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    {feature.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Improved Tabs Section for Mobile */}
      <section className="place-content-between flex justify-items-center flex-col container py-6 md:py-12">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-center mb-4 md:mb-8">
          Comment utiliser Poukave
        </h2>
        <Tabs defaultValue="signaler" className="w-full max-w-xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger
              value="signaler"
              className="px-2 py-2 text-xs md:text-base"
            >
              Signaler
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="px-2 py-2 text-xs md:text-base"
            >
              Catégories
            </TabsTrigger>
            <TabsTrigger
              value="analyse"
              className="px-2 py-2 text-xs md:text-base"
            >
              Analyse
            </TabsTrigger>
          </TabsList>
          {[
            {
              value: "signaler",
              title: "Comment faire un signalement",
              description:
                "Cliquez sur le bouton 'Dénoncer', remplissez le formulaire avec une description du problème, sa catégorie et sa localisation, puis soumettez-le de manière anonyme.",
              buttonText: "Faire un signalement",
              href: "/denoncer",
            },
            {
              value: "categories",
              title: "Nos catégories de signalement",
              description:
                "Fraude, corruption, pollution environnementale, problèmes d'infrastructure, incivilités, et bien plus. Choisissez la catégorie qui correspond le mieux au problème.",
              buttonText: "Voir les catégories",
              href: "/categories",
            },
            {
              value: "analyse",
              title: "Comprendre les données",
              description:
                "Consultez notre page d'analyse pour voir les statistiques, la répartition par catégorie, et les zones géographiques les plus signalées. Des graphiques interactifs sont disponibles.",
              buttonText: "Voir les analyses",
              href: "/statistiques",
            },
          ].map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="mt-3 p-3 md:p-4 border rounded-lg"
            >
              <h3 className="text-base md:text-lg font-medium mb-2">
                {tab.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                {tab.description}
              </p>
              <Link href={tab.href} className="w-full block">
                <Button className="w-full text-sm">{tab.buttonText}</Button>
              </Link>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="place-content-between flex justify-items-center flex-col bg-muted py-6 md:py-12">
        <div className="container px-4">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3 md:mb-4">
              Ensemble, créons une communauté plus transparente
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
              Votre vigilance et vos signalements sont essentiels pour améliorer
              notre société. Rejoignez notre mouvement pour plus de transparence
              et de responsabilité.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/denoncer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Faire un signalement
                </Button>
              </Link>
              <Link href="/ressources" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full">
                  Consulter les ressources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="place-content-between flex justify-items-center flex-col bg-background border-t mt-auto">
        <div className="container py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <Link href="/">
                <h2 className="font-bold">Poukave</h2>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-3 my-2 md:my-0">
              {[
                { label: "Confidentialité", href: "/confidentialite" },
                { label: "Conditions", href: "/conditions" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((link, index) => (
                <Link key={index} href={link.href}>
                  <span className="text-xs md:text-sm text-muted-foreground hover:underline">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              © 2025 Poukave. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
