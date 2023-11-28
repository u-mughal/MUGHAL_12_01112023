import {DataMockRetrieval} from '@/Services/Mock';
import {fetchData} from '@/Services/Api';

export async function getDatasSection(uId, statusApi) {

  const getDatasUserInfos = async () => {
    const { keyData, todayScore, score, userId, userInfos } = statusApi ? await fetchData(uId, '') : DataMockRetrieval('userMainData', uId);
    return {
      keyData: {
        calorieCount: keyData.calorieCount.toLocaleString(),
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

  const formatActivitiesSessions = sessions => 
    sessions.map(({ day, kilogram, calories }) => ({
      day: Number( day.toString().slice(-2)),

      kilogram,
      calories
    }));

  const getDatasActivities = async () => {
    const { userId, sessions } = statusApi ? await fetchData(uId, 'activity') : DataMockRetrieval('userActivities', uId);
    return { userId, sessions: formatActivitiesSessions(sessions) };
  };

  const getDatasAverage = async () => {
    const { userId, sessions } = statusApi ? await fetchData(uId, 'average-sessions') : DataMockRetrieval('userAverageSession', uId);
    const arrayDay = ["L", "M", "M", "J", "V", "S", "D"];
    return { userId, sessions: sessions.map(({ day, sessionLength }) => ({ day: arrayDay[day-1], sessionLength })) };
  };

  const getDatasUserPerformance = async () => {
    const { userId, kind, data } = statusApi ? await fetchData(uId, 'performance') : DataMockRetrieval('userPerformances', uId);
    const kindFrenchArray = ["Cardio", "Energie", "Endurance", "Force", "Vitesse", "Intensité"];
  
    const performanceType = (indexKind) => kindFrenchArray[indexKind] || "Unknown";
  
    return {
      userId,
      performanceType: kind,
      dataPerformance: data.map(({ value, kind }) => ({ value, performanceType: performanceType(kind - 1) }))
    };
  };
  

  return {
    userDatas: await getDatasUserInfos(),
    activitiesDatas: await getDatasActivities(),
    averageDatas: await getDatasAverage(),
    performancesDatas: await getDatasUserPerformance()
  };
}