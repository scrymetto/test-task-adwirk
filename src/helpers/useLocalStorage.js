import {useEffect, useState} from "react";

export const useLocalStorage = key => {
  const [storageData, setStorageData] = useState(
      localStorage.getItem(key)||''
  );
  useEffect(()=>{
      localStorage.setItem(key, storageData);
  }, [storageData]);
  return [storageData, setStorageData]
};