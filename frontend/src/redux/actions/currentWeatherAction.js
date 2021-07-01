import { CURRENT_WEATHER_GET } from '../types/iventTypes';




export const currentWeatherGetFromApi = (currentCoords) => async (dispatch) => {
  const latitude = currentCoords[0];
  const longitude = currentCoords[1];

  const response = await fetch('http://localhost:8080/ivent', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ latitude, longitude }),
  });

  const currentWeather = await response.json();

  dispatch(currentWeatherGet(currentWeather));
};

export const currentWeatherGet = (currentWeather) => {
  return {
    type: CURRENT_WEATHER_GET,
    payload: currentWeather,
  };
}
