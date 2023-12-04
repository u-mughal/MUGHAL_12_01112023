import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatasSection } from "@/UserData/UserDataRetrieval";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import Loader from "@/Components/Loader";
import BarChart from "@/ComponentsRecharts/BarChart";
import Cards from "@/Components/Cards";
import LineChart from "@/ComponentsRecharts/LineChart";
import ErrorMessage from "@/ComponentsRecharts/ErrorMessage";
import RadarChart from "@/ComponentsRecharts/RadarChart";
import RadialBarChart from "@/ComponentsRecharts/RadialBarChart";
import { dataCard } from "@/Components/Utils/dataCard";
import { useNavigate } from 'react-router-dom';


function Profil() {
  const [datas, setDatas] = useState(null);
  const { id: uId } = useParams();
  const [isDataLoading, setDataLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [statusApi, setStatusApi] = useState(false);
  const [tenLastDay, setTenLastDay] = useState(datas);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      errorMessage ? setStatusApi(false) : setStatusApi(true);
      try {
        const fetchedData = await getDatasSection(uId, statusApi);
        setDatas(fetchedData);
        setTenLastDay(fetchedData?.activitiesDatas?.sessions?.slice(-10));
      } catch (err) {
        setErrorMessage(
          err.message !== "Network Error"
            ? err.message
            : "L'API est actuellement indisponible, les données sont mockées." ||
                "Une erreur est survenue"
        );
        setStatusApi(false);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();

    const errorTimeout = setTimeout(() => {
      errorMessage && !errorMessage.includes('utilisateur')&&setErrorMessage(null);
    }, 4000);

    return () => clearTimeout(errorTimeout);
  }, [uId, statusApi, errorMessage]);

  useEffect(() => {
    if (errorMessage && errorMessage.includes('utilisateur')) {
      setTimeout(()=>{ navigate('/');}, 4000);
    }
  }, [errorMessage, navigate]);

  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  if (isDataLoading) return <Loader />;

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