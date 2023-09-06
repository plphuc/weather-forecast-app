export const getLocationCoordinates = async (searchText) => {
  try {
    const result = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=${process.env.REACT_APP_GET_WEATHER_KEY_API}`, {
      headers: {
        'x-requested-with': true,
      }
    });
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentWeather = async (longitude, latitude) => {
  try {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_GET_WEATHER_KEY_API}`);
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

export const getNextDaysForecast = async (longitude, latitude) => {
  try {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_GET_WEATHER_KEY_API}`);
    return result.json();
  } catch (error) {
    console.log(error);
  }
};
