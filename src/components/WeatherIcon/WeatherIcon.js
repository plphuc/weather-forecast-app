import React from 'react';
import styles from './WeatherIcon.module.css';

function WeatherIcon(props) {
  const { iconName } = props;
  const iconUrl = `https://openweathermap.org/img/wn/${iconName}@2x.png`;

  return <img className={styles.weatherIcon} src={iconUrl} alt="weather-icon"></img>;
}

export default WeatherIcon;
