import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { useEffect, useState } from "react";
import { getDatasSection } from '@/Services/dataService'; 
import { useParams } from "react-router-dom";
import BarChart from '@/ComponentsRecharts/BarChart';
import Cards from "@/Components/Cards";
import LineChart from '@/ComponentsRecharts/LineChart';
import ErrorMessage from '@/ComponentsRecharts/ErrorMessage';
import RadarChart from "@/ComponentsRecharts/RadarChart";
import RadialBarChart from "@/ComponentsRecharts/RadialBarChart";
import { dataCard } from "@/Components/Utils/dataCard";


function Profil () {
  const [datas, setDatas] = useState(null);
  const idUser = useParams().id;
  const [isDataLoading, setDataLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // eslint-disable-next-line no-unused-vars, no-undef
  const [kindData, setKindData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDatasSection(idUser, kindData);
        setDatas(fetchedData);
      } catch (err) {
        setErrorMessage(err.message || "An unknown error occurred.");
      } finally {
        setDataLoading(false);
      }
    };
  
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser]);

  if (errorMessage) {
    return <ErrorMessage message= {errorMessage}/>;
  }

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
            <div className="container-line-radar-radial">
              <LineChart className ="linechart-container" data = {datas?.averageDatas?.sessions}/>
              <RadarChart className ="radarchart-container" data = {datas?.performancesDatas?.dataPerformance}/>
              <RadialBarChart className="radialbarchart-container" data = {datas?.userDatas?.score}/>
            </div>
          </div>
          <div className = "cards">
            {dataCard(datas).map((card, index) => (
              <Cards
                key={index}
                icon={card.icon} 
                number={card.number} 
                type={card.type} 
                unit={card.unit} 
                color={card.color}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
  
export default Profil;