'use client';


import React from 'react';
import { 
  ShieldCheck, 
  MessageCircle, 
  AlertOctagon, 
  Flame,
  Droplets,
  Zap,
  Info
} from 'lucide-react';

const Education: React.FC = () => {
  return (
    <div className="p-4 space-y-8 pb-20">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Aprenda a Cuidar</h2>
        <p className="text-sm text-slate-500">Dicas rápidas para quem não entende de mecânica e quer evitar sustos.</p>
      </div>

      {/* Section 1: Preventiva vs Corretiva */}
      <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-slate-800">Preventiva vs. Corretiva</h3>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Preventiva:</strong> Você escolhe quando parar o carro. É planejada e muito mais barata (troca de óleo, filtros, correias). 
          </p>
          <div className="h-px bg-slate-100 w-full" />
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Corretiva/Emergencial:</strong> O carro escolhe quando parar. É urgente, perigosa e custa até 10x mais (motor fundido, pane elétrica no meio da rua).
          </p>
        </div>
      </section>

      {/* Section 2: Conversando com o Mecânico */}
      <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-xl">
            <MessageCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-800">Como falar com o mecânico</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex gap-3 items-start">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <p className="text-sm text-slate-600"><strong>Seja específico:</strong> Não diga apenas "o carro está estranho". Diga "faz um chiado metálico ao frear" ou "treme ao passar de 80km/h".</p>
          </li>
          <li className="flex gap-3 items-start">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <p className="text-sm text-slate-600"><strong>Peça as peças velhas:</strong> É seu direito ver o que foi trocado. Isso evita cobranças por serviços não realizados.</p>
          </li>
          <li className="flex gap-3 items-start">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <p className="text-sm text-slate-600"><strong>Orçamento antes:</strong> Nunca autorize um serviço sem um orçamento escrito. Se o valor for alto, peça uma segunda opinião em outra oficina.</p>
          </li>
        </ul>
      </section>

      {/* Section 3: Sinais de Perigo */}
      <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-xl">
            <AlertOctagon className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-bold text-slate-800">Pare o carro IMEDIATAMENTE se:</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start gap-4 p-3 rounded-2xl bg-red-50">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Flame className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-900">Ponteiro de Temperatura Subir</p>
              <p className="text-xs text-red-700">Indica superaquecimento. Se continuar andando, o motor vai fundir em minutos.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3 rounded-2xl bg-red-50">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Droplets className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-900">Luz do Óleo Acender (Vermelha)</p>
              <p className="text-xs text-red-700">Falta de pressão de óleo. O motor pode travar permanentemente em segundos.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3 rounded-2xl bg-red-50">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Zap className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-900">Luz da Bateria Acender</p>
              <p className="text-xs text-red-700">O alternador parou. O carro vai morrer assim que a bateria esgotar (e a direção/freios podem pesar).</p>
            </div>
          </div>
        </div>
      </section>

      <div className="p-6 bg-slate-900 rounded-[32px] text-white text-center">
        <h4 className="font-bold mb-2">Lembre-se:</h4>
        <p className="text-sm text-slate-400 italic">"O carro não quebra, ele avisa."</p>
      </div>
    </div>
  );
};

export default Education;
