import React from 'react';

import WeatherCard from 'components/WeatherCard/WeatherCard';
import Hightlight from 'components/Hightlight/Hightlight';
import { useWeatherInfo } from 'WeatherInfoProvider';

import styles from './DetailsSection.module.css';
function DetailsSection(props) {
  const { current, nextDays } = useWeatherInfo();
  return (
    <>
      {current && nextDays && <div className={styles.detailsSectionWrapper}>
        <div className={styles.nextDaysForecastWrapper}>
          {nextDays.map((weatherForecastInDay) => {
            return <WeatherCard weatherForecast = {weatherForecastInDay}/>
          })}
        </div>
        <Hightlight />
      </div>}
    </>
  );
}

export default DetailsSection;
