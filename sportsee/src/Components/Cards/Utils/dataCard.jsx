import iconCalories from '@/Components/Cards/Icones/energy.svg';
import iconCarbs from '@/Components/Cards/Icones/apple.svg';
import iconProtein from '@/Components/Cards/Icones/chicken.svg';
import iconFat from '@/Components/Cards/Icones/cheeseburger.svg';

/**
 * Fonction qui génère des données pour les cartes.
 *
 * @param {object} datas - Les données de l'utilisateur.
 * @returns {Array} - Un tableau d'objets représentant les données des cartes.
 */
export const dataCard = (datas) => [
  {
    icon: iconCalories,
    number: datas?.userDatas?.keyData?.calorieCount,
    type: "Calories",
    unit: "kCal",
    color: "#FF00001A", // Couleur des calories
  },
  {
    icon: iconProtein,
    number: datas?.userDatas?.keyData?.proteinCount,
    type: "Proteines",
    unit: "g",
    color: "#4AB8FF1A", // Couleur des protéines
  },
  {
    icon: iconCarbs,
    number: datas?.userDatas?.keyData?.carbohydrateCount,
    type: "Glucides",
    unit: "g",
    color: "#F9CE231A", // Couleur des glucides
  },
  {
    icon: iconFat,
    number: datas?.userDatas?.keyData?.lipidCount,
    type: "Lipides",
    unit: "g",
    color: "#FD51811A", // Couleur des lipides
  },
];