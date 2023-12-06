/**
 * Composant représentant une carte affichant des données.
 *
 * @component
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.icon - Le chemin de l'icône à afficher.
 * @param {number} props.number - La valeur numérique à afficher.
 * @param {string} props.unit - L'unité associée à la valeur numérique.
 * @param {string} props.type - Le type ou la catégorie de la donnée.
 * @param {string} props.color - La couleur de fond de la carte.
 * @returns {JSX.Element} Composant de carte.
 */
function Cards({ icon, number, unit, type, color }) {
  return (
    <div className="cards-container">
      {/* Conteneur pour l'image avec fond coloré */}
      <div className="cards-img" style={{ backgroundColor: color }}>
        {/* Image affichant l'icône */}
        <img src={icon} alt="icon" />
      </div>

      {/* Conteneur pour la description de la carte */}
      <div className="cards-description">
        {/* Conteneur pour la valeur numérique et l'unité */}
        <div className="description-unit">
          {number}
          {unit}
        </div>

        {/* Conteneur pour le type de donnée */}
        <div className="description-type">{type}</div>
      </div>
    </div>
  );
}

export default Cards;
