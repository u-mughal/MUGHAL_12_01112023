import { Routes, Route } from 'react-router';
import HomePage from '@/Pages/Home';
import Error from '@/Pages/Error';
import Profil from '@/Pages/Profil';

function PublicRouter(){

  return (
    <Routes>
      <Route path="/" element= {<HomePage/>}/>
      <Route path="/Profil" element={<Profil/>}/>
      <Route path="/Profil/:id" element={<Profil/>}/>
      <Route path="/*" element={<Error/>}/>
    </Routes>
  );
}

export default PublicRouter;