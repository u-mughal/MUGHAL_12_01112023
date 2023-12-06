/**
 * Composant pour la gestion des routes publiques de l'application.
 * @module PublicRouter
 * @component
 */

import { Routes, Route } from 'react-router';
import Home from '@/Pages/Home/Home';
import Profil from '@/Pages/Profil/Profil';

/**
 * Composant fonctionnel représentant les routes publiques de l'application.
 * @function PublicRouter
 * @returns {JSX.Element} - Composant rendu des routes publiques.
 */
function PublicRouter(){
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profil" element={<Home />} />
        <Route path="/Profil/:id" element={<Profil />} />
        <Route path="/*" element={<Home />} />
      </Routes>
  );
}

export default PublicRouter;