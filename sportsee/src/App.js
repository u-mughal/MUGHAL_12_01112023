/**
 * Composant racine de l'application.
 * @module App
 * @see {@link module:App}
 */

import GetRoutes from "@/Pages/PublicRouter";

/**
 * Composant fonctionnel représentant l'application principale.
 * @function
 * @returns {JSX.Element} Composant racine de l'application.
 */
function App() {
  return (
    <GetRoutes>
      <div>
        {/* Contenu de l'application */}
      </div>
    </GetRoutes>
  );
}

export default App;
