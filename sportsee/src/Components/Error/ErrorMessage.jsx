import React from 'react';

/**
 * Composant représentant une fenêtre modale d'erreur.
 *
 * @component
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.message - Le message d'erreur à afficher.
 * @param {function} props.onClose - La fonction à appeler lors de la fermeture de la fenêtre modale.
 * @returns {JSX.Element} Composant de fenêtre modale d'erreur.
 */
function ErrorMessageModal({ message, onClose }) {
  return (
    <div className="error-message">
      {/* Zone cliquable pour fermer la fenêtre modale */}
      <div onClick={onClose} />
      {/* Contenu de la fenêtre modale */}
      <div>
        {/* Paragraphe affichant le message d'erreur */}
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessageModal;
