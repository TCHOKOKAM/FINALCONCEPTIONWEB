import React, { createContext, useContext, useEffect} from 'react';
import { Depense } from '../types/Depense';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DepenseContextType {
  depenses: Depense[];
  ajouterDepense: (depense: Depense) => void;
  modifierDepense: (id: string, depense: Depense) => void;
  supprimerDepense: (id: string) => void;
}

const DepenseContext = createContext<DepenseContextType | undefined>(undefined);

export const DepenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [depenses, setDepenses] = useLocalStorage<Depense[]>('depenses', []);

  useEffect(() => {
    // Logique pour synchroniser les dépenses si nécessaire
    console.log('Dépenses mises à jour:', depenses);
  }, [depenses]);

  const ajouterDepense = (depense: Depense) => {
    setDepenses((prev: Depense[]) => [...prev, depense]);
  };

  const modifierDepense = (id: string, depense: Depense) => {
    setDepenses((prev: Depense[]) => 
      prev.map((d) => (d.id === id ? depense : d))
    );
  };
  
  const supprimerDepense = (id: string) => {
    setDepenses((prev: Depense[]) => prev.filter((d) => d.id !== id));
  };

  return (
    <DepenseContext.Provider value={{ depenses, ajouterDepense, modifierDepense, supprimerDepense }}>
      {children}
    </DepenseContext.Provider>
  );
};

export const useDepenses = () => {
  const context = useContext(DepenseContext);
  if (!context) {
    throw new Error('useDepenses doit être utilisé à lintérieur dun DepenseProvider');
  }
  return context;
};
