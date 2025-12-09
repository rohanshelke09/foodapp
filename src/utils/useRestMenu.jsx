import React, { useEffect,useState } from 'react'
import { Menu_URL } from './constants';


const useRestMenu = (resId) => {
    const [resInfo,setResInfo] = useState(null);

useEffect(()=>{
    const fetchData=async()=>{
        const data= await fetch(Menu_URL + resId);
        const json=await data.json();
   
        setResInfo(json.data); 
    }
    fetchData();
},[resId]);

  return resInfo;
}

export default useRestMenu;