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
import ErrorMessage from '@/ComponentsRecharts/ErrorMessage';
import PieChart from "@/ComponentsRecharts/PieChart";


function Profil () {
  const [datas, setDatas] = useState(null);
  const idUser = useParams().id;
  const [isDataLoading, setDataLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDatasSection(idUser);
        setDatas(fetchedData);
      } catch (err) {
        setErrorMessage(err.message || "An unknown error occurred.");
      } finally {
        setDataLoading(false);
      }
    };
  
    fetchData();
  }, [idUser]);

  if (errorMessage) {
    return <ErrorMessage message= {errorMessage}/>;
  }

  if (isDataLoading) return null; 
  
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
            <PieChart data = {datas?.userDatas?.score}/>
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