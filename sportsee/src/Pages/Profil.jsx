import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { useEffect, useState } from "react";
import { getDatasSection } from '@/Services/dataService'; 
import { useParams } from "react-router-dom";
import BarChart from '@/ComponentsRecharts/BarChart';
import iconCalories from '@/Icones/energy.svg';
import iconCarbs from '@/Icones/apple.svg';
import iconProtein from '@/Icones/chicken.svg';
import iconFat from '@/Icones/cheeseburger.svg';
import Cards from "@/Components/Card";
import LineChart from '@/ComponentsRecharts/LineChart';


function Profil () {
  const [datas, setDatas] = useState(null);

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

  const idUser = useParams().id;
  const [isDataLoading, setDataLoading] = useState(true);
  const [apiStatut] = useState(false);
  console.log("userid", idUser, "datas 22", datas);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (apiStatut) {
          setDatas(await getDatasSection(parseInt(idUser), apiStatut));
        } else {
          setDatas(await getDatasSection( parseInt(idUser), apiStatut));
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
        <div className = "home-welcome">
          <p>Bonjour <span>{datas?.userDatas?.userInfos?.firstName}</span></p>
          <p>Félicitation ! Vous avez explosé vos objectifs hier <span>👏</span></p>
        </div>
        <div className="container-profil">
          <div className="main-left-container">
            <BarChart className ="barchart-container" data = {datas?.activitiesDatas?.sessions}/>
            <LineChart data = {datas?.averageDatas?.sessions}/>
          </div>
          <div className = "cards">
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
