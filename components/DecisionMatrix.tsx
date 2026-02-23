
import React, { useMemo } from 'react';
import { useAppStore } from '../store';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  HelpCircle,
  Car
} from 'lucide-react';

const DecisionMatrix: React.FC = () => {
  const { vehicle, maintenances } = useAppStore();

  const decision = useMemo(() => {
    if (!vehicle) return null;

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const recentMaintenances = maintenances.filter(m => new Date(m.date) >= sixMonthsAgo);
    const totalSpent = recentMaintenances.reduce((acc, m) => acc + m.value, 0);
    const emergencyCount = recentMaintenances.filter(m => m.type === 'Emergencial').length;
    
    const costRatio = (totalSpent / vehicle.fipeValue) * 100;
    const shouldSell = costRatio > 20 || emergencyCount > 2;

    return { totalSpent, emergencyCount, costRatio, shouldSell };
  }, [maintenances, vehicle]);

  if (!vehicle) {
    return (
      <div className="p-12 text-center text-slate-500">
        Cadastre um veículo primeiro para ver a matriz de decisão.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-slate-800 p-2 rounded-xl">
            <Scale className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold">Matriz de Decisão</h2>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Nossa lógica avalia se seu carro está se tornando um "fundo sem fundo" financeiro.
        </p>
      </div>

      {decision && (
        <>
          <div className={`p-8 rounded-[40px] text-center border-4 ${
            decision.shouldSell 
              ? 'bg-red-50 border-red-200 text-red-900' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              decision.shouldSell ? 'bg-red-500' : 'bg-emerald-500'
            }`}>
              {decision.shouldSell 
                ? <AlertTriangle className="w-10 h-10 text-white" /> 
                : <CheckCircle2 className="w-10 h-10 text-white" />
              }
            </div>
            
            <h3 className="text-2xl font-black mb-3">
              {decision.shouldSell ? 'Hora de Trocar?' : 'Tudo Certo!'}
            </h3>
            
            <p className="text-sm font-medium leading-relaxed mb-6 px-4">
              {decision.shouldSell 
                ? "Seus gastos recentes ultrapassaram o limite de segurança. Este veículo pode estar comprometendo seu planejamento financeiro."
                : "A manutenção está dentro do esperado para o valor do carro. Manter este veículo ainda é a decisão mais racional."
              }
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs py-2 border-t border-black/5 font-bold uppercase tracking-widest opacity-60">
                <span>Gastos (6m)</span>
                <span>{decision.costRatio.toFixed(1)}% da FIPE</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-t border-black/5 font-bold uppercase tracking-widest opacity-60">
                <span>Emergências (6m)</span>
                <span>{decision.emergencyCount} ocorrências</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 px-2">Por que essa decisão?</h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4">
                <TrendingDown className="w-5 h-5 text-blue-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">Regra dos 20%</p>
                  <p className="text-xs text-slate-500">Se gastar mais que 20% do valor do carro em 6 meses, a desvalorização não compensa o conserto.</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4">
                <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">Fator Confiabilidade</p>
                  <p className="text-xs text-slate-500">Mais de 2 manutenções emergenciais (quebraram o carro na rua) indicam falta de confiabilidade mecânica.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DecisionMatrix;
