/**
 * Composant représentant l'en-tête de l'application.
 * Il contient le logo et la barre de navigation avec des liens vers différentes pages.
 *
 * @component
 * @returns {JSX.Element} Élément JSX représentant l'en-tête.
 */
import { NavLink } from "react-router-dom";
import logo from '@/Components/Header/Image/logo.svg';

/**
 * Fonction composant pour l'en-tête de l'application.
 *
 * @function
 * @returns {JSX.Element} Élément JSX représentant l'en-tête.
 */
function Header() {
  return (
    <header className="header-main">
      {/* Logo avec un lien vers la page d'accueil */}
      <NavLink to="/">
        <img className="logo" src={logo} alt="logo de SportSee" />
      </NavLink>

      {/* Barre de navigation avec des liens vers différentes pages */}
      <nav className="navbar">
        <ul className="navbarList">
          <li className="navbarListItem">
            <NavLink className="navbarLink" to="/">Accueil</NavLink>
          </li>
          <li className="navbarListItem">
            <NavLink className="navbarLink" to="/profil">Profil</NavLink>
          </li>
          <li className="navbarListItem">
            <NavLink className="navbarLink" to="/reglages">Réglages</NavLink>
          </li>
          <li className="navbarListItem">
            <NavLink className="navbarLink" to="/communaute">Communauté</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
