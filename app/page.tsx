import Link from 'next/link';
import { ArrowRight, ShieldCheck, Car, Wrench } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Car,
    title: 'Cadastro simples do carro',
    description: 'Guarde dados essenciais como FIPE, quilometragem e histórico de compra.',
  },
  {
    icon: Wrench,
    title: 'Gestão de manutenção',
    description: 'Registre preventivas, corretivas e emergenciais para controlar gastos.',
  },
  {
    icon: ShieldCheck,
    title: 'Decisões sem susto',
    description: 'Acompanhe indicadores para saber se está na hora de manter ou trocar.',
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 py-8">
        <header className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-6 py-4 backdrop-blur">
          <h1 className="text-xl font-bold">CarroSemSusto</h1>
          <Link href="/login" className={buttonVariants()}>Entrar</Link>
        </header>

        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Midnight Bloom + Shadcn</p>
            <h2 className="text-4xl font-extrabold leading-tight lg:text-5xl">Controle seu carro com clareza e zero dor de cabeça.</h2>
            <p className="max-w-xl text-muted-foreground">
              Nova arquitetura em Next.js (App Router), visual com Shadcn e tema inspirado no TweakCN Midnight Bloom.
            </p>
            <div className="flex gap-3">
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "inline-flex")}>
                Fazer login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/dashboard" className={buttonVariants({ variant: "outline", size: "lg" })}>Ver demo</Link>
            </div>
          </div>

          <Card className="border-primary/30 bg-card/90">
            <CardHeader>
              <CardTitle>CarroSemSusto v2</CardTitle>
              <CardDescription>Fluxo inicial para onboarding de usuários.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>✅ NextJS com pasta <strong>app/</strong></p>
              <p>✅ Design system com componentes base do Shadcn</p>
              <p>✅ Landing page + rota de login fake</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-6 w-6 text-accent" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
