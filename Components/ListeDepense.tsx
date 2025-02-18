import React, { useState } from 'react';
import { useDepenses } from '../context/DepenseContext';

const ListeDepenses: React.FC = () => {
  const { depenses } = useDepenses();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrer les dépenses par recherche
  const filteredDepenses = depenses.filter(dep => 
    dep.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastDepense = currentPage * itemsPerPage;
  const indexOfFirstDepense = indexOfLastDepense - itemsPerPage;
  const currentDepenses = filteredDepenses.slice(indexOfFirstDepense, indexOfLastDepense);

  const totalPages = Math.ceil(filteredDepenses.length / itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Liste des Dépenses</h1>
      <input 
        type="text" 
        placeholder="Rechercher par description" 
        className="border p-2 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {currentDepenses.map(dep => (
          <li key={dep.id} className="border-b py-2">
            {dep.date} - {dep.montant} € - {dep.categorie} - {dep.description}
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Précédent
        </button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ListeDepenses;
