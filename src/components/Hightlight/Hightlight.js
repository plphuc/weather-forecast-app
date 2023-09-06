import React from 'react';
import { MdAssistantNavigation } from 'react-icons/md';

import * as utilsFunc from 'utils/convertFunc';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import HightlightCard from 'components/HightlightCard/HightlightCard';
import { useWeatherInfo } from 'WeatherInfoProvider';

import styles from './Hightlight.module.css';
function Hightlight(props) {
  const { current } = useWeatherInfo();
  const windDirection = utilsFunc.convertDegreesToCompass(current.windInfo.deg);
  const visibilityInKm = (current.visibility / 1000).toFixed(1);
  return (
    <div className={styles.todayHightLightWrapper}>
      <span className={styles.todayHightLightTitle}>Today's Hightlights</span>
      <div className={styles.todayHightLightContainer}>
        <HightlightCard title="Wind Status">
          <span className={styles.valueInfo}>{current.windInfo.speed}mps</span>
          <div className={styles.windDirectionWrapper}>
            <div className={styles.windDirectionIcon}>
              <MdAssistantNavigation />
            </div>
            <span>{windDirection}</span>
          </div>
        </HightlightCard>

        <HightlightCard title="Humidity">
          <span className={styles.valueInfo}>{current.humidity}%</span>
          <div className={styles.humidBarWrapper}>
            <div className={styles.humidBarContainer}>
              <ProgressBar humidityPct = {current.humidity} progressBarHeight="8px" />
            </div>
          </div>
        </HightlightCard>

        <HightlightCard title="Visibility">
          <span className={styles.valueInfo}>{visibilityInKm} km</span>
        </HightlightCard>
        
        <HightlightCard title="Air Pressure">
          <span className={styles.valueInfo}>{current.airPressure} mb</span>
        </HightlightCard>
      </div>
    </div>
  );
}

export default Hightlight;
