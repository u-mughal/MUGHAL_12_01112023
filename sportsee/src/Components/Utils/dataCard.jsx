import iconCalories from '@/Icones/energy.svg';
import iconCarbs from '@/Icones/apple.svg';
import iconProtein from '@/Icones/chicken.svg';
import iconFat from '@/Icones/cheeseburger.svg';

export const dataCard = (datas)=> [
  {
    icon: iconCalories,
    number: datas?.userDatas?.keyData?.calorieCount,
    type: "Calories",
    unit: "kCal",
    color: "#FF00001A"

  },
  {
    icon: iconProtein,
    number: datas?.userDatas?.keyData?.proteinCount,
    type: "Proteines",
    unit: "g",
    color: "#4AB8FF1A"
  },
  {
    icon: iconCarbs,
    number: datas?.userDatas?.keyData?.carbohydrateCount,
    type: "Glucides",
    unit: "g",
    color:"#F9CE231A"
  },
  {
    icon: iconFat,
    number: datas?.userDatas?.keyData?.lipidCount,
    type: "Lipides",
    unit: "g",
    color: "#FD51811A"
  },
];