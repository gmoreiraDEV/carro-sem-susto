'use client';


import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Save, Car, ArrowLeft } from 'lucide-react';

const VehicleForm: React.FC = () => {
  const { vehicle, saveVehicle } = useAppStore();
  const [formData, setFormData] = useState({
    brand: vehicle?.brand || '',
    model: vehicle?.model || '',
    year: vehicle?.year || '',
    currentKm: vehicle?.currentKm || 0,
    fipeValue: vehicle?.fipeValue || 0,
    purchaseDate: vehicle?.purchaseDate || new Date().toISOString().split('T')[0]
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveVehicle(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-100 p-3 rounded-2xl">
          <Car className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Seu Veículo</h2>
          <p className="text-sm text-slate-500">Mantenha os dados atualizados</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Marca</label>
            <input 
              type="text" 
              required
              className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="Ex: Honda"
              value={formData.brand}
              onChange={e => setFormData({...formData, brand: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Modelo</label>
            <input 
              type="text" 
              required
              className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="Ex: Civic EXR"
              value={formData.model}
              onChange={e => setFormData({...formData, model: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Ano</label>
              <input 
                type="text" 
                required
                className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Ex: 2018"
                value={formData.year}
                onChange={e => setFormData({...formData, year: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">KM Atual</label>
              <input 
                type="number" 
                required
                className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="0"
                value={formData.currentKm}
                onChange={e => setFormData({...formData, currentKm: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Valor FIPE (Manual)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">R$</span>
              <input 
                type="number" 
                required
                className="w-full bg-white border border-slate-200 p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="0,00"
                value={formData.fipeValue}
                onChange={e => setFormData({...formData, fipeValue: parseFloat(e.target.value) || 0})}
              />
            </div>
            <p className="mt-1 text-[10px] text-slate-400 px-1">Consulte o valor atual no site da FIPE para melhor precisão.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Data de Compra</label>
            <input 
              type="date" 
              className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={formData.purchaseDate}
              onChange={e => setFormData({...formData, purchaseDate: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.98] transition-all"
        >
          <Save className="w-5 h-5" />
          {vehicle ? 'Atualizar Dados' : 'Salvar Veículo'}
        </button>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-xl text-center text-sm font-semibold animate-bounce">
            Dados salvos com sucesso!
          </div>
        )}
      </form>
    </div>
  );
};

export default VehicleForm;
