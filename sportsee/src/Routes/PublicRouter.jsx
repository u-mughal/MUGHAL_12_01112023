import { Routes, Route } from 'react-router';
import Home from '@/Pages/Home';
import Error from '@/Pages/Error';
import Profil from '@/Pages/Profil';
import { createContext } from 'react';

export const DatasContext = createContext();

function PublicRouter(){
  
  return (
    <DatasContext.Provider value={DatasContext}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Profil" element={<Profil/> }/>
        <Route path="/Profil/:id" element={<Profil/>} />
        <Route path="/*" element={<Error />}/>
      </Routes>
    </DatasContext.Provider>
  );
}

export default PublicRouter;