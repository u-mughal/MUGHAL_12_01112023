/**
 * Fonction asynchrone pour récupérer les données de l'API.
 * @function fetchData
 * @param {string} userId - Identifiant de l'utilisateur.
 * @param {string} endpoint - Point d'extrémité de l'API spécifique (facultatif).
 * @returns {Promise<Object>} - Objet représentant les données récupérées de l'API.
 * @throws {string} - Erreur générée en cas d'échec de l'appel API.
 */

import axios from "axios";

export const fetchData = async (userId, endpoint) => {
  const API_URL = "http://localhost:3001"; 

  try {
    const response = await axios.get(`${API_URL}/user/${userId}${endpoint ? '/' + endpoint : ''}`).then((response) => response.data);
    return response.data; 
  } catch (error) {
    throw ("API call failed:", error);
  }
};
