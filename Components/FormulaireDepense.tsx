import React, { useState } from 'react';
import { useDepenses } from '../context/DepenseContext';
import { Depense } from '../types/Depense';

const FormulaireDepense: React.FC<{ depense?: Depense; onSubmit?: () => void }> = ({ depense, onSubmit }) => {
  const [montant, setMontant] = useState(depense ? depense.montant : 0);
  const [date, setDate] = useState(depense ? depense.date : '');
  const [categorie, setCategorie] = useState(depense ? depense.categorie : '');
  const [description, setDescription] = useState(depense ? depense.description : '');
  const [notification, setNotification] = useState<string | null>(null);
  
  const { ajouterDepense, modifierDepense } = useDepenses();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!montant || !date || !categorie || !description) {
      setNotification("Tous les champs sont requis.");
      return;
    }

    try {
      if (depense) {
        modifierDepense(depense.id, { ...depense, montant, date, categorie, description });
        setNotification("Dépense modifiée avec succès !");
      } else {
        ajouterDepense({ id: Date.now().toString(), montant, date, categorie, description });
        setNotification("Dépense ajoutée avec succès !");
      }
    } catch (error) {
      setNotification("Une erreur est survenue. Veuillez réessayer.");
    }

    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {notification && <div className="mb-4 text-red-500">{notification}</div>}
      <input type="number" value={montant} onChange={(e) => setMontant(Number(e.target.value))} placeholder="Montant" required className="border p-2 w-full mb-2" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="border p-2 w-full mb-2" />
      <input type="text" value={categorie} onChange={(e) => setCategorie(e.target.value)} placeholder="Catégorie" required className="border p-2 w-full mb-2" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className="border p-2 w-full mb-2"></textarea>
      <button type="submit" className="bg-blue-500 text-white p-2">Soumettre</button>
    </form>
  );
};

export default FormulaireDepense;

