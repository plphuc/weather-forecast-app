import React from 'react';
import { MdAssistantNavigation } from 'react-icons/md';

import * as utilsFunc from 'utils/convertFunc';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import HighlightCard from 'components/HighlightCard/HighlightCard';
import { useWeatherInfo } from 'WeatherInfoProvider';

import styles from './Highlight.module.css';

function Highlight(props) {
  const { current } = useWeatherInfo();
  const windDirection = utilsFunc.convertDegreesToCompass(current.windInfo.deg);
  const visibilityInKm = (current.visibility / 1000).toFixed(1);
  return (
    <div className={styles.todayHighLightWrapper}>
      <span className={styles.todayHigLightTitle}>Today's Highlights</span>
      <div className={styles.todayHighLightContainer}>
        <HighlightCard title="Wind Status">
          <span className={styles.valueInfo}>{current.windInfo.speed}mps</span>
          <div className={styles.windDirectionWrapper}>
            <div className={styles.windDirectionIcon}>
              <MdAssistantNavigation />
            </div>
            <span>{windDirection}</span>
          </div>
        </HighlightCard>

        <HighlightCard title="Humidity">
          <span className={styles.valueInfo}>{current.humidity}%</span>
          <div className={styles.humidBarWrapper}>
            <div className={styles.humidBarContainer}>
              <ProgressBar humidityPct = {current.humidity} progressBarHeight="8px" />
            </div>
          </div>
        </HighlightCard>

        <HighlightCard title="Visibility">
          <span className={styles.valueInfo}>{visibilityInKm} km</span>
        </HighlightCard>
        
        <HighlightCard title="Air Pressure">
          <span className={styles.valueInfo}>{current.airPressure} mb</span>
        </HighlightCard>
      </div>
    </div>
  );
}

export default Highlight;
