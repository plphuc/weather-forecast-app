
import WeatherIcon from 'components/WeatherIcon/WeatherIcon';
import * as utilsFunc from 'utils/convertFunc'
import styles from './WeatherCard.module.css'

function WeatherCard({weatherForecast}) {
  const { date, iconName, tempMax, tempMin} = weatherForecast
  const formatedDate = utilsFunc.formatDateString(date)
  const convertedTempMax = Math.round(utilsFunc.convertKevinToCelcius(tempMax))
  const convertedTempMin = Math.round(utilsFunc.convertKevinToCelcius(tempMin))
  
  return (
    <div className={styles.wrapper}>
      <span className={styles.dateInfo}>{formatedDate}</span>
      <span className={styles.weatherIcon}>
        <WeatherIcon iconName={iconName}/>
      </span>
      <div className={styles.weatherTemp}>
        <span className={styles.maxTemp}>{convertedTempMax}°C</span>
        <span className={styles.minTemp}>{convertedTempMin}°C</span>
      </div>
    </div>
  );
}

export default WeatherCard;