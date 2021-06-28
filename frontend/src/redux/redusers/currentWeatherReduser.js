import { CURRENT_WEATHER_GET } from '../types/iventTypes';

export default function currentWeatherReduser(state = {
  todayWindSpeed: '',
  tomorrowWindSpeed: '',
  afterTomorrowWindSpeed: '',
  inThreeDaysWindSpeed: '',
  todayCloudBaseHeight: '',
  tomorrowCloudBaseHeight: '',
  afterTomorrowCloudBaseHeight: '',
  inThreeDaysCloudBaseHeight: '',
  todayWindDirection: '',
  tomorrowWindDirection: '',
  afterTomorrowWindDirection: '',
  inThreeDaysWindDirection: '',
  todayPrecipitationProbability: '',
  tomorrowPrecipitationProbability: '',
  afterTomorrowPrecipitationProbability: '',
  inThreeDaysPrecipitationProbability: '',
  todayTemp: '',
  tomorrowTemp: '',
  afterTomorrowTemp: '',
  inThreeDaysTemp: '',
  todayThunderstormActivity: '',
  tomorrowThunderstormActivity: '',
  afterTomorrowThunderstormActivity: '',
  inThreeDaysThunderstormActivity: '',
  todayCloudy: '',
  tomorrowCloudy: '',
  afterTomorrowCloudy: '',
  inThreeDaysCloudy: '',
}, { type, payload }) {

  switch (type) {
    case CURRENT_WEATHER_GET: {
      return payload;
    }

    default:
      return state;
  }
};
