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
import Image from "next/image";

import { DotPattern } from "@/components/magicui/dot-pattern";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TextAnimate } from "@/components/magicui/text-animate";
import { cn } from "@/lib/utils";

export function DotPatternDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
}

export default function Home() {
  return (
    <div className="p-4 flex min-h-screen flex-col">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
      {/* Header */}
      <header className="bg-background sticky top-0 z-50 w-full border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              width={120}
              height={30}
              priority
            />
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Documentation
            </Button>
            <Button variant="ghost" size="sm">
              Tutoriels
            </Button>
            <Button variant="ghost" size="sm">
              À propos
            </Button>
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-s font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-s">
                Dénoncer
              </span>
            </ShimmerButton>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 sm:py-32 space-y-8 md:space-y-12">
        <div className="max-w-3xl mx-auto text-center">
          <TextAnimate animation="blurInUp" by="character" once>
            Blur in by character
          </TextAnimate>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <TextAnimate animation="blurInUp" by="character" once>
              Votre projet Next.js avec shadcn/ui
            </TextAnimate>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Une page d'accueil moderne, responsive et intuitive pour démarrer
            votre projet.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Commencer</Button>
            <Button size="lg" variant="outline">
              En savoir plus
            </Button>
          </div>
        </div>
      </section>
      {/* Features Section */}

      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Composants Réutilisables</CardTitle>
              <CardDescription>
                Créez des interfaces utilisateur modernes avec des composants
                prédéfinis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                shadcn/ui offre une collection de composants accessibles et
                personnalisables.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Explorer les composants
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Optimale</CardTitle>
              <CardDescription>
                Profitez des optimisations automatiques de Next.js.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Bénéficiez du rendu côté serveur, de la génération statique et
                de l'optimisation des images.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Voir les performances
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personnalisation Facile</CardTitle>
              <CardDescription>
                Adaptez le design à votre marque sans effort.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Les composants shadcn/ui sont conçus pour être personnalisables
                selon vos besoins.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Voir le guide
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      {/* Tabs Section */}
      <section className="container py-16 md:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          Découvrez les possibilités
        </h2>
        <Tabs defaultValue="commencer" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="commencer">Commencer</TabsTrigger>
            <TabsTrigger value="installer">Installation</TabsTrigger>
            <TabsTrigger value="deployer">Déploiement</TabsTrigger>
          </TabsList>
          <TabsContent value="commencer" className="mt-6 p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">Premiers pas</h3>
            <p className="text-muted-foreground mb-4">
              Modifiez{" "}
              <code className="bg-muted px-1 py-0.5 rounded">app/page.tsx</code>{" "}
              pour commencer à personnaliser votre application.
            </p>
            <Button>Voir la documentation</Button>
          </TabsContent>
          <TabsContent value="installer" className="mt-6 p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">Installation rapide</h3>
            <p className="text-muted-foreground mb-4">
              Installez les dépendances et configurez votre environnement de
              développement en quelques étapes.
            </p>
            <Button>Guide d'installation</Button>
          </TabsContent>
          <TabsContent value="deployer" className="mt-6 p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">Déployez facilement</h3>
            <p className="text-muted-foreground mb-4">
              Déployez votre application sur Vercel en quelques clics pour une
              mise en ligne rapide.
            </p>
            <Button>Déployer maintenant</Button>
          </TabsContent>
        </Tabs>
      </section>
      {/* CTA Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Prêt à commencer votre projet?
            </h2>
            <p className="text-muted-foreground mb-8">
              Lancez-vous et créez une application web moderne avec Next.js et
              shadcn/ui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={16}
                  height={16}
                  className="mr-2 dark:invert"
                />
                Déployer sur Vercel
              </Button>
              <Button size="lg" variant="outline">
                Consulter les ressources
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-background border-t mt-auto">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/next.svg"
                alt="Next.js Logo"
                width={80}
                height={20}
                className="dark:invert"
              />
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                Exemples
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:underline"
              >
                Support
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Votre Projet. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
