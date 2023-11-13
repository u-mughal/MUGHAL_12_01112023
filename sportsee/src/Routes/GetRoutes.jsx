import { Routes, Route } from 'react-router';
import HomePage from '@/Pages/Home';
import Error from '@/Pages/Error';
import Profil from '@/Pages/Profil';

function GetRoutes(){

  return (
    <Routes>
      <Route path="/" element= {<HomePage/>}/>
      <Route path="/*" element={<Error/>}/>
      <Route path="/Profil" element={<Profil/>}/>
    </Routes>
  );
}

export default GetRoutes;