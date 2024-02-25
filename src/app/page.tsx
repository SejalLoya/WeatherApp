"use client";

import { useEffect, useState } from "react";
import styles from './page.module.css';
import SearchIcon from '@mui/icons-material/Search';
let WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
import cloudgif from '../app/assets/cloudy.gif';
import hazegif from '../app/assets/haze.gif';
import smokegif from '../app/assets/smoke.gif';
import cleargif from '../app/assets/clear.gif';
import Image from "next/image";

export default function Home() {
  const [place, setPlace] = useState("Delhi");
  const [placeData, setPlaceData] = useState<any>(null);
  const currentTime = new Date().toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit'
  })
  const getWeatherData = async () => {
    if(place && place.length>0)
    {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();
        setPlaceData(data);
        console.log("Data is",data.name);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(()=>{
    getWeatherData();
  },[])
  return (
   <div className={styles.outerdiv}>
    <div className={styles.searchbar}>
      <input type="search" placeholder="Enter City Name" onChange={(e)=>setPlace(e.target.value)} />
      <button onClick={getWeatherData}><SearchIcon /></button>
    </div>
    {
      placeData && <div className={styles.row}>
        <div className={styles.section1}>
        <div className={styles.section11}>
          {placeData.weather[0].main === 'Clouds' && (
            <Image src={cloudgif} alt='cloudy' height={200} width={200} />
           ) }
           {placeData.weather[0].main === 'Haze' && (
            <Image src={hazegif} alt='haze' height={200} width={200} />
           )}
           {placeData.weather[0].main === 'Smoke' && (
            <Image src={smokegif} alt='smoke' height={200} width={200} />
           )}
           {placeData.weather[0].main === 'Clear' && (
            <Image src={cleargif} alt='clear' height={200} width={200} />
           )}

           <p className={styles.temp}>{(placeData?.main.temp - 273.15).toFixed(1)}<span>°C</span></p>
        </div>
          <div className={styles.section11}>
            <p className={styles.city}>{placeData?.name}</p>
            <p className={styles.weathertype}>{placeData.weather[0].main}</p>
          </div>
        </div>

        <div className={styles.timediv}>
          <p className={styles.time}>{currentTime}</p>
        </div>
        </div>
    }

    {
      placeData && 
      <div className={styles.section2}>
        <div className={styles.section21}>
          <p className={styles.head1}>Temperature</p>
          <p className={styles.head2}>{(placeData?.main.temp - 273.15).toFixed(1)} °C</p>
        </div>

        <div className={styles.section21}>
          <p className={styles.head1}> Minimum Temperature</p>
          <p className={styles.head2}>{(placeData?.main.temp_min - 273.15).toFixed(1)} °C</p>
        </div>

        <div className={styles.section21}>
          <p className={styles.head1}>Maximum Temperature</p>
          <p className={styles.head2}>{(placeData?.main.temp_max - 273.15).toFixed(1)} °C</p>
        </div>

        <div className={styles.section21}>
          <p className={styles.head1}>Humidity</p>
          <p className={styles.head2}>{placeData?.main.humidity}</p>
        </div>

        <div className={styles.section21}>
          <p className={styles.head1}>Pressure</p>
          <p className={styles.head2}>{placeData?.main.pressure}</p>
        </div>

        <div className={styles.section21}>
          <p className={styles.head1}>Wind Speed</p>
          <p className={styles.head2}>{placeData?.wind.speed}</p>
        </div>
        </div>
    }
   </div>
  );
}
