import {useEffect, useState} from "react";

export const useLocalStorage = key => {
  const [storageData, setStorageData] = useState(
      localStorage.getItem(key)||''
  );
  useEffect(()=>{
      console.log(storageData)
      localStorage.setItem(key, storageData);
  }, [storageData]);
  return [storageData, setStorageData]
};