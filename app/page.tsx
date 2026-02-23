import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const dores = [
  '“O carro tá baixando água… isso é grave?”',
  '“O mecânico falou um monte… eu não entendi nada.”',
  '“Eu já gastei demais… será que ainda vale manter?”',
  '“Troco de carro agora ou vou me arrepender no financiamento?”',
];

const beneficios = [
  {
    emoji: '✅',
    title: 'Menos ansiedade',
    description: 'Você passa a acompanhar sinais e gastos com rotina, não no desespero.',
  },
  {
    emoji: '💰',
    title: 'Decisão mais racional',
    description: 'Veja quanto você gastou nos últimos meses e compare com o valor do seu carro.',
  },
  {
    emoji: '🧠',
    title: 'Conversa melhor com mecânico',
    description: 'Você chega com informação: sintomas, histórico, datas e custos.',
  },
  {
    emoji: '📌',
    title: 'Organização real',
    description: 'Tudo registrado: manutenção preventiva, corretiva e emergencial.',
  },
];

const inclusos = [
  'Dashboard com total gasto (6 e 12 meses) + indicador visual',
  'Registro de manutenções com categorias (arrefecimento, óleo, pneus, freios, elétrica, suspensão…)',
  'Checklist mensal inteligente (sinais comuns que leigo consegue observar)',
  'Matriz “manter vs trocar” baseada nos seus próprios gastos',
  'Página educativa: sinais de risco, o que é normal, e como falar com mecânico',
];

const paraQuemSim = [
  'Você quer evitar sustos e parar de decidir no medo',
  'Você não entende de carro, mas quer controle',
  'Você quer saber se está gastando “normal” ou “passou do ponto”',
  'Você quer organizar a manutenção sem planilhas confusas',
];

const paraQuemNao = [
  'Você quer um app cheio de integrações e telemetria',
  'Você quer diagnóstico automático (isso é com mecânico)',
  'Você quer “milagre” ou promessa de economia garantida',
];

const faq = [
  {
    q: 'Isso substitui mecânico?',
    a: 'Não. O app te ajuda a organizar informação e tomar decisões com mais clareza. Diagnóstico final é sempre com profissional.',
  },
  {
    q: 'Preciso entender de carro pra usar?',
    a: 'Não. Foi feito pra leigos. Checklist e categorias são simples.',
  },
  {
    q: 'Funciona no celular?',
    a: 'Sim. É web mobile-first.',
  },
  {
    q: 'Tem integração com FIPE automática?',
    a: 'Não no MVP. Você coloca o valor manualmente (mais rápido e objetivo).',
  },
  {
    q: 'Posso cadastrar mais de um carro?',
    a: 'Na versão inicial, 1 carro por conta.',
  },
  {
    q: 'Como recebo acesso?',
    a: 'Acesso é imediato via login após o pagamento.',
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 py-8">
        <header className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-6 py-4 backdrop-blur">
          <h1 className="text-xl font-bold">CarroSemSusto</h1>
          <Link href="/login" className={buttonVariants()}>
            Quero acessar agora
          </Link>
        </header>

        <section className="rounded-3xl border border-border bg-card/70 p-8 lg:p-12">
          <p className="mb-2 text-sm uppercase tracking-[0.15em] text-accent">CarroSemSusto</p>
          <h2 className="text-3xl font-extrabold leading-tight lg:text-5xl">
            Pare de dirigir no susto. Organize a manutenção e tome decisões sem ser enganado.
          </h2>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
            Um mini app simples pra quem não entende de carro: registre gastos, faça checklists mensais e saiba
            quando é manutenção normal ou quando está virando prejuízo.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">✅ Acesso imediato • 📱 Funciona no celular • 🧾 Tudo organizado em um lugar</p>
          <div className="mt-6">
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }), 'inline-flex')}>
              Quero acessar agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Sem “mecaniquês”. Sem enrolação. Sem promessas irreais.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Se você já passou por isso, vai entender:</h3>
          <div className="grid gap-3">
            {dores.map((dor) => (
              <Card key={dor}>
                <CardContent className="py-4 text-base text-muted-foreground">{dor}</CardContent>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground">
            O CarroSemSusto existe pra te dar clareza — com um sistema simples e prático.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">O que você ganha usando o CarroSemSusto</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {beneficios.map((beneficio) => (
              <Card key={beneficio.title}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {beneficio.emoji} {beneficio.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{beneficio.description}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Em 3 passos:</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>1) Cadastre seu carro</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Marca, modelo, ano, quilometragem e valor aproximado (FIPE/manual).
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>2) Registre manutenções e custos</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">Data, categoria, descrição e valor. Simples.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3) Faça o checklist mensal</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Marque “OK / Atenção / Problema” e acompanhe o histórico.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">O que vem dentro</h3>
          <Card>
            <CardContent className="space-y-3 py-6">
              {inclusos.map((item) => (
                <p key={item} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </p>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Isso é pra você se…</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              {paraQuemSim.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Não é pra você se…</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              {paraQuemNao.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl border border-border bg-card p-8 text-center">
          <h3 className="text-2xl font-bold">Acesso simples, preço simples</h3>
          <p className="mt-2 text-muted-foreground">Pagamento único. Acesso imediato. Sem mensalidade nesta fase.</p>
          <div className="mt-6">
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }), 'inline-flex')}>
              Quero acessar o CarroSemSusto
            </Link>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Você compra hoje, começa hoje.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">FAQ (perguntas frequentes)</h3>
          <div className="grid gap-3">
            {faq.map((item) => (
              <Card key={item.q}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{item.a}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-primary/30 bg-card/90 p-8 text-center">
          <h3 className="text-3xl font-extrabold">Menos susto. Mais clareza.</h3>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Se seu carro virou fonte de ansiedade, você não precisa esperar dar ruim pra organizar.
          </p>
          <div className="mt-6">
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }), 'inline-flex')}>
              Quero acessar agora
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Feito pra quem quer paz, não “mecaniquês”.</p>
        </section>
      </div>
    </main>
  );
}
