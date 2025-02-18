import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <Link to="/" className="text-white mr-4">Accueil</Link>
      <Link to="/liste" className="text-white">Liste des Dépenses</Link>
    </nav>
  );
};

export default Navbar;
