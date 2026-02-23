
import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  ArrowRight,
  Info
} from 'lucide-react';
import { ChecklistStatus, ChecklistItem } from '../types';

const INITIAL_ITEMS: Omit<ChecklistItem, 'status'>[] = [
  { id: '1', label: 'Nível do líquido de arrefecimento', recommendation: 'Verifique se está entre o Min e Max. Nunca abra com o motor quente.' },
  { id: '2', label: 'Vazamento visível sob o carro', recommendation: 'Pequenas gotas de água (do AC) são normais. Óleo ou fluidos coloridos exigem oficina imediata.' },
  { id: '3', label: 'Cheiro doce no motor', recommendation: 'Isso indica vazamento de aditivo. Pare o carro e verifique o nível de água.' },
  { id: '4', label: 'Óleo dentro do prazo', recommendation: 'Confira a etiqueta no para-brisa. Troque por tempo (6 meses) ou KM.' },
  { id: '5', label: 'Pneus calibrados', recommendation: 'Calibre semanalmente seguindo o manual do proprietário.' },
  { id: '6', label: 'Desgaste irregular dos pneus', recommendation: 'Se um lado estiver mais gasto, seu carro precisa de alinhamento.' },
  { id: '7', label: 'Barulho estranho ao frear', recommendation: 'Pode ser fim das pastilhas. Procure um especialista em freios.' },
  { id: '8', label: 'Luz de alerta no painel', recommendation: 'Luz amarela: atenção. Luz vermelha: Pare o carro imediatamente.' },
  { id: '9', label: 'Ar quente funcionando', recommendation: 'Se não esquenta, pode haver problema no sistema de arrefecimento (falta de fluido).' },
];

const Checklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(
    INITIAL_ITEMS.map(item => ({ ...item, status: 'OK' }))
  );

  const updateStatus = (id: string, status: ChecklistStatus) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const progress = (items.filter(i => i.status === 'OK').length / items.length) * 100;

  return (
    <div className="p-4 space-y-6">
      <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ClipboardCheck className="w-24 h-24" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Checklist Mensal</h2>
        <p className="text-emerald-100 text-sm mb-4">Gaste 5 minutos para evitar prejuízos de milhares de reais.</p>
        
        <div className="bg-emerald-700/50 rounded-full h-2 w-full mt-6 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-500" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm transition-all">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <span className="font-semibold text-slate-800 text-sm leading-tight">{item.label}</span>
                <div className="flex bg-slate-50 p-1 rounded-xl shrink-0">
                  <button 
                    onClick={() => updateStatus(item.id, 'OK')}
                    className={`p-1.5 rounded-lg transition-all ${item.status === 'OK' ? 'bg-green-500 text-white shadow-sm' : 'text-slate-300'}`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => updateStatus(item.id, 'Atenção')}
                    className={`p-1.5 rounded-lg transition-all ${item.status === 'Atenção' ? 'bg-yellow-500 text-white shadow-sm' : 'text-slate-300'}`}
                  >
                    <AlertCircle className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => updateStatus(item.id, 'Problema')}
                    className={`p-1.5 rounded-lg transition-all ${item.status === 'Problema' ? 'bg-red-500 text-white shadow-sm' : 'text-slate-300'}`}
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {(item.status === 'Problema' || item.status === 'Atenção') && (
                <div className={`p-3 rounded-2xl flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
                  item.status === 'Problema' ? 'bg-red-50 border border-red-100' : 'bg-yellow-50 border border-yellow-100'
                }`}>
                  <Info className={`w-5 h-5 shrink-0 ${item.status === 'Problema' ? 'text-red-500' : 'text-yellow-600'}`} />
                  <p className={`text-xs leading-relaxed font-medium ${item.status === 'Problema' ? 'text-red-800' : 'text-yellow-800'}`}>
                    {item.recommendation}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-100 rounded-2xl text-center">
        <p className="text-xs text-slate-500">Repita este checklist no primeiro final de semana de cada mês.</p>
      </div>
    </div>
  );
};

export default Checklist;
