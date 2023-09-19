import { useEffect, useState } from 'react';
import { dataApi } from '../api/dataApi';

export const useData = (selectedState) => {
  const [info, setData] = useState([]);

  useEffect(() => {
    if (selectedState) {
      getData(selectedState);
    }
  }, [selectedState]);

  const getData = async (state) => {
    try {
      const resp = await dataApi.get(`https://api.covidtracking.com/v1/states/${state}/daily.json`);
      setData(resp.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return {
    info,
  };
};
