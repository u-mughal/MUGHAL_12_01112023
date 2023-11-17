import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { useEffect, useState } from "react";
import { getDatasSection } from '@/Services/dataService'; 
import { useParams } from "react-router-dom";
import Barschart from '@/Components/Recharts/Barschart';
import iconCalories from '@/Icones/energy.svg';
import iconCarbs from '@/Icones/apple.svg';
import iconProtein from '@/Icones/chicken.svg';
import iconFat from '@/Icones/cheeseburger.svg';
import Cards from "@/Components/Card";


function Profil () {
  const idUser = useParams().id;
  const [datas, setDatas] = useState(null);
  const [isDataLoading, setDataLoading] = useState(true);
  const [apiStatut] = useState(false);
  console.log("userid", idUser, "datas 22", datas);

  const cardData = [
    {
      icon: iconCalories,
      number: datas?.userDatas?.keyData?.calorieCount,
      type: "Calories",
      unit: "kCal",
    },
    {
      icon: iconProtein,
      number: datas?.userDatas?.keyData?.proteinCount,
      type: "Proteines",
      unit: "g",
    },
    {
      icon: iconCarbs,
      number: datas?.userDatas?.keyData?.carbohydrateCount,
      type: "Glucides",
      unit: "g",
    },
    {
      icon: iconFat,
      number: datas?.userDatas?.keyData?.lipidCount,
      type: "Lipides",
      unit: "g",
    },
  ];

  useEffect(() => {
    const url = "http://localhost:3000";
    console.log("datamock", url +'/datas/datasMocked.json');
    const fetchData = async () => {
      try {
        if (apiStatut) {
          setDatas(await getDatasSection(undefined, parseInt(idUser), apiStatut));
        } else {
          setDatas(await getDatasSection(url + '/datas/datasMocked.json', parseInt(idUser)));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setDataLoading(false);
      }
    };
  
    fetchData();
    return () => {
    };
  }, [apiStatut, idUser]);
  
  console.log('Routes file', datas);
  
  if (isDataLoading) return null; 
  
  return (
    <div>
      <Header/>
      <Sidebar/>
      <main>
        <Barschart data = {datas?.activitiesDatas?.sessions}/>
        <div className = "cards">
          <div>
            {cardData.map((card, index) => (
              <Cards
                key={index}
                icon={card.icon} 
                number={card.number} 
                type={card.type} 
                unit={card.unit} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
  
export default Profil;