/**
 * Composant représentant un loader animé.
 *
 * @component
 * @returns {JSX.Element} Élément JSX représentant le loader.
 */
function Loader() {
  return (
    // Conteneur du loader
    <div className="loader-container">
      {/* Loader animé */}
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
