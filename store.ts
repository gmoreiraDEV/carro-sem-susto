'use client';


import { useState, useEffect } from 'react';
import { Vehicle, MaintenanceRecord } from './types';

const STORAGE_KEY = 'carro_sem_susto_data';

interface AppData {
  vehicle: Vehicle | null;
  maintenances: MaintenanceRecord[];
}

export const useAppStore = () => {
  const [data, setData] = useState<AppData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { vehicle: null, maintenances: [] };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

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
