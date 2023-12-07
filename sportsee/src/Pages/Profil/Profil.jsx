/**
 * Composant pour afficher les informations du profil utilisateur.
 * @module Profil
 * @component
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatasSection } from "@/UserData/UserDataRetrieval";
import Header from "@/Components/Header/Header";
import Sidebar from "@/Components/Sidebar/Sidebar";
import BarChart from "@/Components/Graphs/BarChart";
import Cards from "@/Components/Cards/Cards";
import LineChart from "@/Components/Graphs/LineChart";
import ErrorMessage from "@/Components/Error/ErrorMessage";
import RadarChart from "@/Components/Graphs/RadarChart";
import RadialBarChart from "@/Components/Graphs/RadialBarChart";
import { dataCard } from "@/Components/Cards/Utils/dataCard";
import { useNavigate } from 'react-router-dom';

/**
 * Composant fonctionnel représentant la page du profil utilisateur.
 * @function Profil
 * @returns {JSX.Element} - Composant rendu de la page du profil utilisateur.
 */
function Profil() {
  const [datas, setDatas] = useState(null);
  const { id: uId } = useParams();
  const [isDataLoading, setDataLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [statusApi, setStatusApi] = useState(false);
  const [tenLastDay, setTenLastDay] = useState(datas);
  const navigate = useNavigate();

  /**
   * Effet pour récupérer les données de l'utilisateur et gérer les erreurs.
   * @function useEffect
   * @inner
   */
  useEffect(() => {
    const fetchData = async () => {
      errorMessage?setStatusApi(false): setStatusApi(true);
      try {
        const fetchedData = await getDatasSection(uId, statusApi); 
        
        setDatas(fetchedData); 
        setTenLastDay(fetchedData?.activitiesDatas?.sessions?.slice(-10));
      } catch (err) {
        setErrorMessage(err.message !== "Network Error" ? err.message : "  L'API est hors service, les données sont mockées" );
        setStatusApi(false);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  
    const errorTimeout = setTimeout(() => {
      errorMessage && !errorMessage.includes('utilisateur') && setErrorMessage(null);
    }, 4000);
  
    return () => clearTimeout(errorTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uId, statusApi]);

  /**
   * Effet pour rediriger vers la page d'accueil après un message d'erreur.
   * @function useEffect
   * @inner
   */
  useEffect(() => {
    if (errorMessage && errorMessage.includes('utilisateur')) {
      setTimeout(()=>{ navigate('/');}, 4000);
    }
  }, [errorMessage, navigate]);

  /**
   * JSX rendu en fonction de différentes conditions (chargement, erreur ou succès).
   * @returns {JSX.Element} - JSX rendu en fonction de l'état actuel.
   */
  if (errorMessage) return <><ErrorMessage message = {errorMessage}/></>;
  if (isDataLoading) return null; 

  return (
    <div>
      <Header />
      <Sidebar />
      {!errorMessage && (
        <main>
          <div className="home-welcome">
            <p className="home-welcome-p">
              Bonjour <span>{datas?.userDatas?.userInfos?.firstName}</span>
            </p>
            <p>
              Félicitation ! Vous avez explosé vos objectifs hier{" "}
              <span>👏</span>
            </p>
          </div>
          <div className="container-profil">
            <div className="main-left-container">
              <BarChart
                className="barchart-container"
                data={tenLastDay}
              />
              <div className="container-line-radar-radial">
                <LineChart
                  className="linechart-container"
                  data={datas?.averageDatas?.sessions}
                />
                <RadarChart
                  className="radarchart-container"
                  data={datas?.performancesDatas?.dataPerformance}
                />
                <RadialBarChart
                  className="radialbarchart-container"
                  data={datas?.userDatas?.score}
                />
              </div>
            </div>
            <div className="cards">
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
      )}
    </div>
  );
}

export default Profil;
