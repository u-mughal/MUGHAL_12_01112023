import axios from "axios";

export const fetchData = async (API_URL, userId, endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/${endpoint}`);
    console.log('fetchData', response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API:", error.message);
    
    if (error.response) {
      const statusCode = error.response.status;
      console.error(`Code de statut de la réponse: ${statusCode}`);

      if (statusCode === 404) {
        console.error("Ressource non trouvée. Vérifiez les paramètres de la requête.");
      } else if (statusCode === 401) {
        console.error("Non autorisé. Assurez-vous d'avoir les permissions nécessaires.");
      } else {
        console.error("Réponse de l'API:", error.response.data);
      }
    } else if (error.request) {
      console.error("Aucune réponse reçue de l'API. Vérifiez votre connexion réseau.");
    } else {
      console.error("Une erreur s'est produite lors de la requête vers l'API:", error.message);
    }

    throw error;
  }
};
