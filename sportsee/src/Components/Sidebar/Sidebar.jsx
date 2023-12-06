import yoga from "@/Components/Sidebar/Icones/yoga.svg";
import swim from "@/Components/Sidebar/Icones/swim.svg";
import bike from "@/Components/Sidebar/Icones/bike.svg";
import barbell from "@/Components/Sidebar/Icones/barbell.svg";

/**
 * Composant représentant la barre latérale de l'application.
 * Affiche des icônes d'activités physiques et un texte de copyright.
 *
 * @component
 * @returns {JSX.Element} Élément JSX représentant la barre latérale.
 */

function Sidebar() {
  return (
    // Conteneur principal de la barre latérale
    <div className="side-bar__main">
      <div className="main__icones-container">
        <img className="svg" src={yoga} alt="Yoga Icon" />
        <img className="svg" src={swim} alt="Swim Icon" />
        <img className="svg" src={bike} alt="Bike Icon" />
        <img className="svg" src={barbell} alt="Barbell Icon" />
        </div>
      {/* Conteneur du copyright */}
      <div className="main__copyright-container">
        {/* Texte du copyright */}
        <p>Copyright, SportSee 2023</p>
      </div>
    </div>
  );
}
export default Sidebar;
