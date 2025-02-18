import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navibar';
import Accueil from './Components/accueil';
import ListeDepenses from './Components/ListeDepense';
import FormulaireDepense from './Components/FormulaireDepense';
import { DepenseProvider } from './context/DepenseContext';

const App: React.FC = () => {
  return (
    <Router>
      <DepenseProvider>
        <Navbar />
        <Routes>
        <Route path="/Accueil" element={<Accueil />} />
          <Route path="/liste" element={<ListeDepenses />} />
          <Route path="/" element={<FormulaireDepense />} />
          
        </Routes>
      </DepenseProvider>
    </Router>
  );
};

export default App;

