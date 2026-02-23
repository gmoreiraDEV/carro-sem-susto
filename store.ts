'use client';


import { useState, useEffect } from 'react';
import { Vehicle, MaintenanceRecord } from './types';

const STORAGE_KEY = 'carro_sem_susto_data';

interface AppData {
  vehicle: Vehicle | null;
  maintenances: MaintenanceRecord[];
}

export const useAppStore = () => {
  const [data, setData] = useState<AppData>({ vehicle: null, maintenances: [] });
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setData(JSON.parse(stored));
    }
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated || typeof window === 'undefined') return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, hasHydrated]);

  const saveVehicle = (vehicle: Vehicle) => {
    setData(prev => ({ ...prev, vehicle }));
  };

  const addMaintenance = (record: MaintenanceRecord) => {
    setData(prev => ({
      ...prev,
      maintenances: [record, ...prev.maintenances].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }));
  };

  const deleteMaintenance = (id: string) => {
    setData(prev => ({
      ...prev,
      maintenances: prev.maintenances.filter(m => m.id !== id)
    }));
  };

  return {
    vehicle: data.vehicle,
    maintenances: data.maintenances,
    saveVehicle,
    addMaintenance,
    deleteMaintenance
  };
};
