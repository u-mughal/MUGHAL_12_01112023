import { Routes, Route } from 'react-router';
import Home from '@/Pages/Home';
import Error from '@/Pages/Error';
import Profil from '@/Pages/Profil';

function PublicRouter(){
  return (
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Profil" element={<Home/> }/>
      <Route path="/Profil/:id" element={<Profil/>} />
      <Route path="/*" element={<Error />}/>
    </Routes>
  );
}

export default PublicRouter;