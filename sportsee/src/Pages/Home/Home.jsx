/**
 * Composant fonctionnel représentant la page d'accueil.
 * Ce composant affiche des boutons permettant de naviguer vers les profils des utilisateurs.
 *
 * @component
 * @returns {JSX.Element} Élément JSX représentant la page d'accueil.
 */
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="buttons-container">
      <div>
        {/* Bouton pour accéder au profil de l'utilisateur 12 */}
        <Link to="/Profil/12"><button>Utilisateur 12</button></Link>
        
        {/* Bouton pour accéder au profil de l'utilisateur 18 */}
        <Link to="/Profil/18"><button>Utilisateur 18</button></Link>
      </div>
    </div>
  );
}

export default Home;
