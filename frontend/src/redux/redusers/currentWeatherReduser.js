import { CURRENT_WEATHER_GET } from '../types/iventTypes';

export default function currentWeatherReduser(state = {
  temp: '',
  windSpeed: '',
  windDirection: '',
  cloudBaseHeight: '',
  precipitationProbability: '',
}, { type, payload }) {

  switch (type) {
    case CURRENT_WEATHER_GET: {
      return payload;
    }

    default:
      return state;
  }
};
