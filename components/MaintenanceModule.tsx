
import React, { useState } from 'react';
import { useAppStore } from '../store';
import { 
  Plus, 
  Trash2, 
  Wrench, 
  Calendar, 
  Tag, 
  DollarSign, 
  FileText,
  Search,
  ChevronDown,
  X
} from 'lucide-react';
import { MaintenanceRecord, MaintenanceType, MaintenanceCategory } from '../types';

const MaintenanceModule: React.FC = () => {
  const { maintenances, addMaintenance, deleteMaintenance } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<MaintenanceRecord, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    type: 'Preventiva',
    category: 'Óleo e Filtros',
    description: '',
    value: 0,
    km: 0
  });

  const categories: MaintenanceCategory[] = [
    'Arrefecimento', 'Óleo e Filtros', 'Pneus', 'Freios', 'Elétrica', 'Suspensão', 'Outro'
  ];

  const types: MaintenanceType[] = ['Preventiva', 'Corretiva', 'Emergencial'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMaintenance({
      ...formData,
      id: Math.random().toString(36).substr(2, 9)
    });
    setShowForm(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'Preventiva',
      category: 'Óleo e Filtros',
      description: '',
      value: 0,
      km: 0
    });
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manutenções</h2>
          <p className="text-sm text-slate-500">{maintenances.length} registros totais</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-100 active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm p-4 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Novo Registro</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Data</label>
                  <input 
                    type="date" required
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tipo</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as MaintenanceType})}
                  >
                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Categoria</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as MaintenanceCategory})}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Valor</label>
                  <input 
                    type="number" step="0.01" required
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="R$ 0,00"
                    value={formData.value || ''}
                    onChange={e => setFormData({...formData, value: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Quilometragem</label>
                  <input 
                    type="number" required
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="KM"
                    value={formData.km || ''}
                    onChange={e => setFormData({...formData, km: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Descrição</label>
                <textarea 
                  required rows={3}
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  placeholder="O que foi feito?"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-[0.98] transition-all"
              >
                Salvar Registro
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-2 rounded-xl">
            <DollarSign className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Acumulado</p>
            <p className="text-xl font-bold text-slate-800">
              {formatCurrency(maintenances.reduce((acc, m) => acc + m.value, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {maintenances.length === 0 ? (
          <div className="text-center py-12 px-6">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500">Nenhum registro encontrado.</p>
          </div>
        ) : (
          maintenances.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                      item.type === 'Emergencial' ? 'bg-red-100 text-red-600' :
                      item.type === 'Corretiva' ? 'bg-orange-100 text-orange-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{item.category}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{formatCurrency(item.value)}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{item.km.toLocaleString()} KM</p>
                  <button 
                    onClick={() => {
                      if (confirm('Deseja excluir este registro?')) deleteMaintenance(item.id);
                    }}
                    className="mt-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MaintenanceModule;
