import { Routes, Route } from 'react-router';
import HomePage from '@/Pages/Home';
import Error from '@/Pages/Error';
import Profil from '@/Pages/Profil';
import { createContext, useState } from 'react';

export const StatutApiContext = createContext();

function PublicRouter(){
  const [apiStatut, setApiStatut] = useState(false);
  const statutApiModifiable = (value) => { setApiStatut(value); };

  return (
    <StatutApiContext.Provider value={{ apiStatut, statutApiModifiable }}>
      <Routes>
        <Route path="/" element={<HomePage apiStatut={apiStatut} statutApiModifiable={statutApiModifiable} />} />
        <Route path="/Profil" element={<Profil apiStatut={apiStatut} />} />
        <Route path="/Profil/:id" element={<Profil apiStatut={apiStatut} />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </StatutApiContext.Provider>
  );
}

export default PublicRouter;