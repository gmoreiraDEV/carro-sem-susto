import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CarroSemSusto',
  description: 'Controle de manutenção automotiva sem sustos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
