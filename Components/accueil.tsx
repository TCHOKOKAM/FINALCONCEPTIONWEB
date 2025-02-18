import React from 'react';
import { useDepenses } from '../context/DepenseContext';

const Accueil: React.FC = () => {
  const { depenses } = useDepenses();
  
  const depensesTotalesDuMois = depenses.reduce((acc, dep) => acc + dep.montant, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Résumé des Dépenses</h1>
      <p>Total des Dépenses du Mois : {depensesTotalesDuMois} €</p>
    </div>
  );
};

export default Accueil;
