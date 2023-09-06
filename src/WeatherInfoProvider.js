import { useContext, createContext, useReducer } from 'react';

import * as fetchApi from 'utils/getRequests';
import * as utilsFunc from 'utils/convertFunc'
const extractInfoFromWeatherObj = (weatherInfoObj) => {
  const date = new Date(weatherInfoObj.dt_txt || weatherInfoObj.dt * 1000);
  const iconName = weatherInfoObj.weather[0].icon;
  const weatherName = weatherInfoObj.weather[0].main;
  const temperature = weatherInfoObj.main.temp;
  const tempMax = weatherInfoObj.main.temp_max;
  const tempMin = weatherInfoObj.main.temp_min;
  const windInfo = weatherInfoObj.wind;
  const humidity = weatherInfoObj.main.humidity;
  const visibility = weatherInfoObj.visibility;
  const airPressure = weatherInfoObj.main.pressure;

  return { date, iconName, weatherName, temperature, tempMax, tempMin, windInfo, humidity, visibility, airPressure };
};

const extractWeatherInfoFromFetch = ({ currentWeatherForecast, nextDaysWeatherForecast }) => {
  const nextDaysForecast = [];
  const currentDay = utilsFunc.convertEpochToDate(currentWeatherForecast.dt)

  nextDaysWeatherForecast.list.forEach((weatherForecastInDay) => {
    const date = new Date(weatherForecastInDay.dt_txt);
    if (currentDay.getDate() !== date.getDate()) {
      // Just add a weather forecast for a day
      if (nextDaysForecast.length === 0 || date.getDate() !== nextDaysForecast[nextDaysForecast.length - 1].date.getDate()) {
        const nextDayForecast = extractInfoFromWeatherObj(weatherForecastInDay);
        nextDaysForecast.push(nextDayForecast);
      }
    }
  });
  const location = currentWeatherForecast.name;

  return { location, current: extractInfoFromWeatherObj(currentWeatherForecast), nextDays: nextDaysForecast };
};

const fetchWeather = async (longitude, latitude) => {
  const currentWeatherForecast = await fetchApi.getCurrentWeather(longitude, latitude);
  const nextDaysWeatherForecast = await fetchApi.getNextDaysForecast(longitude, latitude);

  return { currentWeatherForecast, nextDaysWeatherForecast };
};

const WeatherContext = createContext();
const WeatherDispatchContext = createContext();

const initialWeatherInfo = {
  location: null,
  current: null,
  nextDays: null,
};

export function WeatherInfoProvider({ children }) {
  const [weather, dispatch] = useReducer(weatherInfoReducer, initialWeatherInfo);

  return (
    <WeatherContext.Provider value={weather}>
      <WeatherDispatchContext.Provider value={dispatch}>{children}</WeatherDispatchContext.Provider>
    </WeatherContext.Provider>
  );
}

export function useWeatherInfo() {
  return useContext(WeatherContext);
}

function useWeatherInfoDispatch() {
  return useContext(WeatherDispatchContext);
}

export function useUpdateWeather() {
  const dispatch = useWeatherInfoDispatch();
  return (lon, lat) => {
    const weatherForecast = fetchWeather(lon, lat);
    weatherForecast.then((data) => {
      const extractedWeatherInfo = extractWeatherInfoFromFetch(data);
      dispatch({
        type: 'change',
        data: extractedWeatherInfo,
      });
    });
  };
}

function weatherInfoReducer(state, action) {
  switch (action.type) {
    case 'change': {
      return {
        ...state,
        location: action.data.location,
        current: action.data.current,
        nextDays: action.data.nextDays,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
