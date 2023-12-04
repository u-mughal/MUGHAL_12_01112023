import { Routes, Route } from 'react-router';
import Home from '@/Pages/Home';
import Profil from '@/Pages/Profil';

function PublicRouter(){
  return (
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Profil" element={<Home/> }/>
      <Route path="/Profil/:id" element={<Profil/>} />
      <Route path="/*" element={<Home />}/>
    </Routes>
  );
}

export default PublicRouter;