import {DataMockRetrieval} from '@/Services/ServiceMock';
import {fetchData} from '@/Services/ServiceApi';

/**
* Fonction asynchrone pour récupérer les données détaillées d'un utilisateur, y compris les informations utilisateur,
* les activités, la moyenne des sessions, et les performances.
* @param {string} uId - L'identifiant unique de l'utilisateur.
* @param {boolean} statusApi - Statut indiquant si l'API est utilisée (true) ou si la version mockée est utilisée (false).
* @returns {Promise<Object>} - Un objet contenant les données détaillées de l'utilisateur.
*/
export async function getDatasSection(uId, statusApi) {
 /**
  * Fonction interne pour gérer les erreurs lors de la récupération des données via l'API.
  * @param {string} uId - L'identifiant unique de l'utilisateur.
  * @param {string} endpoint - L'endpoint de l'API.
  * @returns {Promise<Object>} - Les données récupérées.
  */
 const fetchDataErrorHandling = async (uId, endpoint) => {
   try {
     return await fetchData(uId, endpoint);
   } catch (error) {
     console.error(`An error occurred while fetching ${endpoint}:`, error);
     throw error;
   }
 };

 /**
  * Fonction interne pour récupérer les données liées aux informations de base de l'utilisateur.
  * @returns {Promise<Object>} - Les données des informations utilisateur formatées.
  */
 const getDatasUserInfos = async () => {
  // Vérifie le statut de l'API pour déterminer si l'appel doit être fait à l'API réelle ou à la version mockée.
  const { keyData, todayScore, score, userId, userInfos } = statusApi
    ? await fetchDataErrorHandling(uId, '') // Appel à l'API
    : DataMockRetrieval('userMainData', uId); // Appel à la version mockée

   return {
     keyData: {
       calorieCount: keyData.calorieCount.toLocaleString('en-US'),
       proteinCount: keyData.proteinCount,
       carbohydrateCount: keyData.carbohydrateCount,
       lipidCount: keyData.lipidCount
     },
     score: todayScore || score,
     userId,
     userInfos: {
       firstName: userInfos.firstName,
       lastName: userInfos.lastName,
       age: userInfos.age
     }
   };
 };

 /**
  * Fonction interne pour formater les sessions d'activités pour un affichage spécifique.
  * @param {Array<Object>} sessions - Les sessions d'activités brutes.
  * @returns {Array<Object>} - Les sessions d'activités formatées.
  */
 const formatActivitiesSessions = sessions => 
   sessions.map(({ day, kilogram, calories }) => ({
     day: Number( day.toString().slice(-2)),
     kilogram,
     calories
   }));

 /**
  * Fonction interne pour récupérer les données liées aux activités de l'utilisateur.
  * @returns {Promise<Object>} - Les données des activités utilisateur formatées.
  */
 const getDatasActivities = async () => {
   const { userId, sessions } = statusApi
     ? await fetchDataErrorHandling(uId, 'activity')
     : DataMockRetrieval('userActivities', uId);
   return { userId, sessions: formatActivitiesSessions(sessions) };
 };

 /**
  * Fonction interne pour récupérer les données liées à la moyenne des sessions de l'utilisateur.
  * @returns {Promise<Object>} - Les données de la moyenne des sessions formatées.
  */
 const getDatasAverage = async () => {
   const { userId, sessions } = statusApi
     ? await fetchDataErrorHandling(uId, 'average-sessions')
     : DataMockRetrieval('userAverageSession', uId);
   const arrayDay = ["L", "M", "M", "J", "V", "S", "D"];
   return { userId, sessions: sessions.map(({ day, sessionLength }) => ({ day: arrayDay[day-1], sessionLength })) };
 };

 /**
  * Fonction interne pour récupérer les données liées aux performances de l'utilisateur.
  * @returns {Promise<Object>} - Les données des performances utilisateur formatées.
  */
 const getDatasUserPerformance = async () => {
   const { userId, kind, data } = statusApi
     ? await fetchDataErrorHandling(uId, 'performance')
     : DataMockRetrieval('userPerformances', uId);
   const PerformanceTypeArray = ["Cardio", "Energie", "Endurance", "Force", "Vitesse", "Intensité"];

   const PerformanceType = (indexKind) => PerformanceTypeArray[indexKind] || "Unknown";

   return {
     userId,
     kind,
     dataPerformance: data.map(({ value, kind }) => ({ value, kind: PerformanceType(kind-1) }))
   };
 };
 
 // Retourne un objet avec les données récupérées après avoir appelé les différentes fonctions internes.
 return {
   userDatas: await getDatasUserInfos(),
   activitiesDatas: await getDatasActivities(),
   averageDatas: await getDatasAverage(),
   performancesDatas: await getDatasUserPerformance()
 };
}
