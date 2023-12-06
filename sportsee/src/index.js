/**
 * Point d'entrée de l'application React.
 * Il utilise React Strict Mode pour des avertissements supplémentaires pendant le développement.
 * Initialise la racine de l'application dans l'élément avec l'ID 'root'.
 * Intègre les composants Header, Sidebar et App dans une structure de base avec React Router.
 * Applique les styles définis dans le fichier Main.scss.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "@/Styles/Main.scss";
import Header from "@/Components/Header/Header";
import Sidebar from "@/Components/Sidebar/Sidebar";

// Crée la racine de l'application dans l'élément avec l'ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Sidebar />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
