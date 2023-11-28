import datas from "@/Data/MockedData.json";

export const DataMockRetrieval = (type, uId) => {
  const data = datas[0][type].find(data =>data.userId === parseInt(uId));
  if (!data) {
    throw new Error(`L'utilisateur ${uId} n'est pas enregistré`);
  }
  return data;
};
