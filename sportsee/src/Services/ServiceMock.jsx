/**
 * Fonction pour récupérer des données mockées en fonction du type et de l'identifiant de l'utilisateur.
 * @function DataMockRetrieval
 * @param {string} type - Type de données à récupérer.
 * @param {string} uId - Identifiant de l'utilisateur.
 * @returns {Object} - Données mockées correspondant au type et à l'identifiant de l'utilisateur.
 * @throws {Error} - Erreur générée si l'utilisateur spécifié n'est pas enregistré.
 */

import datas from "@/Data/MockedData.json";

export const DataMockRetrieval = (type, uId) => {
  const data = datas[0][type].find(data => data.userId === parseInt(uId));
  if (!data) {
    throw new Error(`L'utilisateur ${uId} n'est pas enregistré`);
  }
  return data;
};
