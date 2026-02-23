
import React, { useState } from 'react';
import { 
  Car, 
  LayoutDashboard, 
  Wrench, 
  ClipboardCheck, 
  Scale, 
  Info,
  Menu,
  X,
  PlusCircle
} from 'lucide-react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import VehicleForm from './components/VehicleForm';
import MaintenanceModule from './components/MaintenanceModule';
import Checklist from './components/Checklist';
import DecisionMatrix from './components/DecisionMatrix';
import Education from './components/Education';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      case 'Dashboard': return <Dashboard setView={setCurrentView} />;
      case 'Vehicle': return <VehicleForm />;
      case 'Maintenance': return <MaintenanceModule />;
      case 'Checklist': return <Checklist />;
      case 'Decision': return <DecisionMatrix />;
      case 'Education': return <Education />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 max-w-lg mx-auto border-x border-slate-200 shadow-xl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('Dashboard')}>
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
            <Car className="text-white w-5 h-5" />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-slate-800">CarroSemSusto</h1>
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {renderView()}
      </main>

      {/* Navigation Mobile Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-50">
        {navigation.slice(0, 5).map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentView(item.view as AppView)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${
              currentView === item.view 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Side Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white pt-16 px-6">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="flex flex-col gap-4 mt-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.view as AppView)}
                className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-semibold transition-colors ${
                  currentView === item.view ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                }`}
              >
                <item.icon className="w-6 h-6" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
