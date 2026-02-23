'use client';


import React, { useMemo } from 'react';
import { useAppStore } from '../store';
import { 
  TrendingUp, 
  Calendar, 
  Wallet, 
  AlertTriangle, 
  ChevronRight,
  Plus,
  // Fix: Added missing icon imports
  Car,
  PlusCircle,
  ClipboardCheck
} from 'lucide-react';
import { AppView } from '../types';

interface DashboardProps {
  setView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const { vehicle, maintenances } = useAppStore();

  const metrics = useMemo(() => {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    const twelveMonthsAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    const last6Months = maintenances
      .filter(m => new Date(m.date) >= sixMonthsAgo)
      .reduce((acc, m) => acc + m.value, 0);

    const lastYear = maintenances
      .filter(m => new Date(m.date) >= twelveMonthsAgo)
      .reduce((acc, m) => acc + m.value, 0);

    const fipe = vehicle?.fipeValue || 0;
    const ratio = fipe > 0 ? (last6Months / fipe) * 100 : 0;

    let status: 'safe' | 'warning' | 'critical' = 'safe';
    if (ratio > 20) status = 'critical';
    else if (ratio > 10) status = 'warning';

    return { last6Months, lastYear, ratio, status };
  }, [maintenances, vehicle]);

  if (!vehicle) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-blue-50 p-6 rounded-full mb-6">
          <Car className="w-16 h-16 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo ao CarroSemSusto</h2>
        <p className="text-slate-600 mb-8 max-w-xs">
          Para começar a acompanhar sua saúde automotiva, cadastre seu veículo agora.
        </p>
        <button 
          onClick={() => setView('Vehicle')}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <Plus className="w-5 h-5" />
          Cadastrar Meu Carro
        </button>
      </div>
    );
  }

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="p-4 space-y-6">
      {/* Vehicle Summary */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Car className="w-24 h-24 rotate-12" />
        </div>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{vehicle.brand}</p>
        <h2 className="text-2xl font-bold">{vehicle.model} <span className="text-slate-400 font-normal">{vehicle.year}</span></h2>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">
              {vehicle.currentKm.toLocaleString()} KM
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">
              FIPE: {formatCurrency(vehicle.fipeValue)}
            </span>
          </div>
          <button 
            onClick={() => setView('Vehicle')}
            className="text-white/60 hover:text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Indicator Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Saúde Financeira</h3>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            metrics.status === 'safe' ? 'bg-green-100 text-green-700' :
            metrics.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {metrics.status === 'safe' ? 'Excelente' : metrics.status === 'warning' ? 'Alerta' : 'Crítico'}
          </span>
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex">
             <div 
              className={`h-full transition-all duration-1000 ${
                metrics.status === 'safe' ? 'bg-green-500' :
                metrics.status === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${Math.min(metrics.ratio * 3, 100)}%` }}
            />
          </div>
          <span className="text-sm font-bold text-slate-500 whitespace-nowrap">
            {metrics.ratio.toFixed(1)}% do valor
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          {metrics.status === 'safe' && "Seus gastos estão sob controle. Manutenção preventiva em dia!"}
          {metrics.status === 'warning' && "Atenção: Os custos de manutenção estão se aproximando de 20% do valor do carro."}
          {metrics.status === 'critical' && "Cuidado! O custo de manutenção recente é muito alto em relação ao valor do carro."}
        </p>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-2">
          <div className="p-2 bg-blue-50 w-fit rounded-xl">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs font-medium text-slate-500">Últimos 6 Meses</span>
          <span className="text-lg font-bold text-slate-800">{formatCurrency(metrics.last6Months)}</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-2">
          <div className="p-2 bg-indigo-50 w-fit rounded-xl">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-xs font-medium text-slate-500">Total no Ano</span>
          <span className="text-lg font-bold text-slate-800">{formatCurrency(metrics.lastYear)}</span>
        </div>
      </div>

      {/* CTA Section */}
      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={() => setView('Maintenance')}
          className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <PlusCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-700">Nova Manutenção</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
        </button>

        <button 
          onClick={() => setView('Checklist')}
          className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <ClipboardCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-700">Checklist Mensal</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
