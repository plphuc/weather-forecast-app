import React from 'react';
import { MdLocationOn } from 'react-icons/md';

import { useWeatherInfo } from 'WeatherInfoProvider';
import WeatherIcon from 'components/WeatherIcon/WeatherIcon';
import * as utilsFunc from 'utils/convertFunc';

import styles from './MainSection.module.css';

function MainSection(props) {
  const {location, current} = useWeatherInfo();
  const dateString = current && utilsFunc.formatDateString(current.date);
  const temperature = current?.temperature && Math.round(utilsFunc.convertKevinToCelcius(current.temperature));
  return (
    current && (
      <div className={styles.wrapper}>
        <div className={styles.weatherIconWrapper}>
          <WeatherIcon iconName={current.iconName} />
        </div>

        <div className={styles.weatherInfoWrapper}>
          <span className={styles.temperatureInfo}>{temperature}°C</span>
          <span className={styles.weatherCondition}>{current.weatherName}</span>
          <span className={styles.dateInfo}>Today • {dateString}</span>
          <span className={styles.locationInfo}>
            <MdLocationOn />
            {location}
          </span>
        </div>
      </div>
    )
  );
}

export default MainSection;
