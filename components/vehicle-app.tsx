'use client';

import { useEffect, useState } from 'react';
import { Car, LayoutDashboard, Wrench, ClipboardCheck, Scale, Info, Menu, X, Moon, Sun } from 'lucide-react';
import { AppView } from '@/types';
import Dashboard from '@/components/Dashboard';
import VehicleForm from '@/components/VehicleForm';
import MaintenanceModule from '@/components/MaintenanceModule';
import Checklist from '@/components/Checklist';
import DecisionMatrix from '@/components/DecisionMatrix';
import Education from '@/components/Education';

export default function VehicleApp() {
  const [currentView, setCurrentView] = useState<AppView>('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = window.localStorage.getItem('theme');
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark';

    setTheme(initialTheme);
    root.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    window.localStorage.setItem('theme', nextTheme);
  };

  const navigation = [
    { name: 'Início', icon: LayoutDashboard, view: 'Dashboard' },
    { name: 'Meu Carro', icon: Car, view: 'Vehicle' },
    { name: 'Manutenções', icon: Wrench, view: 'Maintenance' },
    { name: 'Checklist', icon: ClipboardCheck, view: 'Checklist' },
    { name: 'Decidir', icon: Scale, view: 'Decision' },
    { name: 'Dicas', icon: Info, view: 'Education' },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard':
        return <Dashboard setView={setCurrentView} />;
      case 'Vehicle':
        return <VehicleForm />;
      case 'Maintenance':
        return <MaintenanceModule />;
      case 'Checklist':
        return <Checklist />;
      case 'Decision':
        return <DecisionMatrix />;
      case 'Education':
        return <Education />;
      default:
        return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="hidden h-screen w-72 flex-col border-r border-border bg-card/60 p-5 lg:flex">
        <div className="mb-8 flex cursor-pointer items-center gap-3" onClick={() => setCurrentView('Dashboard')}>
          <div className="rounded-lg bg-primary p-2 shadow-sm">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">CarroSemSusto</h1>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentView(item.view as AppView)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors ${
                currentView === item.view ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col border-x border-border bg-background shadow-xl lg:mx-0 lg:min-h-0 lg:max-w-none lg:flex-1 lg:border-x-0 lg:shadow-none">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:px-8">
          <div className="flex cursor-pointer items-center gap-2" onClick={() => setCurrentView('Dashboard')}>
            <div className="rounded-lg bg-primary p-1.5 shadow-sm lg:hidden">
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold tracking-tight lg:text-2xl">{navigation.find((item) => item.view === currentView)?.name ?? 'CarroSemSusto'}</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 transition-colors hover:bg-muted"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
              title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-full p-2 transition-colors hover:bg-muted lg:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-24 lg:pb-8">{renderView()}</main>

        <nav className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 items-center justify-around border-t border-border bg-card px-2 py-2 lg:hidden">
          {navigation.slice(0, 5).map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentView(item.view as AppView)}
              className={`flex flex-col items-center rounded-xl p-2 transition-all ${
                currentView === item.view ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="mt-1 text-[10px] font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background px-6 pt-16 lg:hidden">
          <button onClick={() => setIsMenuOpen(false)} className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted">
            <X className="h-8 w-8" />
          </button>
          <div className="mt-8 flex flex-col gap-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setCurrentView(item.view as AppView);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-4 rounded-2xl p-4 text-lg font-semibold transition-colors ${
                  currentView === item.view ? 'bg-primary/10 text-primary' : 'text-foreground'
                }`}
              >
                <item.icon className="h-6 w-6" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
