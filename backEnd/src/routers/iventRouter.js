const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Ivent = require('../models/iventModel');
const fetch = require('node-fetch');

const normalizationOfWindDirection = (directionInDegrees) => {
  if ((directionInDegrees >= 0 && directionInDegrees < 30) || ((directionInDegrees > 330 && directionInDegrees <= 360))) {
    return ('Восток')
  }
  if (directionInDegrees >= 30 && directionInDegrees < 60) {
    return ('Северо-Восток')
  }
  if (directionInDegrees >= 60 && directionInDegrees < 120) {
    return ('Север')
  }
  if (directionInDegrees >= 120 && directionInDegrees < 150) {
    return ('Северо-Запад')
  }
  if (directionInDegrees >= 150 && directionInDegrees < 210) {
    return ('Запад')
  }
  if (directionInDegrees >= 210 && directionInDegrees < 240) {
    return ('Юго-Запад')
  }
  if (directionInDegrees >= 240 && directionInDegrees < 300) {
    return ('Юг')
  }
  if (directionInDegrees >= 300 && directionInDegrees < 330) {
    return ('Юго-Восток')
  }
  return directionInDegrees;
}

router.route('/')
  .get(async (req, res) => {
    try {
      const allIvents = await Ivent.find().populate('creator');
      console.log(allIvents);
      res.json({ allIvents });
    } catch (error) {
      console.error(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      const newIventData = { ...req.body, creator: mongoose.Types.ObjectId(req.body.creator) };
      const newIvent = await Ivent.create(newIventData);
      res.status(200).json(newIvent);
    } catch (error) {
      console.error(error.message);
    }
  })
  .patch(async (req, res) => {
    const meteomaticsLogin = 'student_roman';
    const meteomaticsParol = '06XCKf7hBdqoE';

    const { latitude, longitude } = req.body;
    // const todayNotFormat = new Date();
    // const today = todayNotFormat.toISOString().split('.')[0];
    // const tomorrow = new Date(todayNotFormat.getTime() + (24 * 60 * 60 * 1000)).toISOString().split('.')[0];
    // const afterTomorrow = new Date(todayNotFormat.getTime() + ((24 * 60 * 60 * 1000) * 2)).toISOString().split('.')[0];
    // const inThreeDays = new Date(todayNotFormat.getTime() + ((24 * 60 * 60 * 1000) * 3)).toISOString().split('.')[0];

    // const windSpeedCode = 'wind_speed_10m:ms'; //Сила ветра (м/с)
    // const cloudBaseHeightCode = 'cloud_base_agl:m'; //Высата облачной базы (м)
    // const windDirectionCode = 'wind_dir_10m:d'; //Направление ветра (от вет от api в градусах)
    // const precipitationProbabilityCode = 'prob_precip_1h:p'; //Вероятность осадков (%)
    // const tempCode = 't_0m:C'; //Температура воздуха (град Цельсия)
    // const thunderstormActivityCode = 'prob_tstorm_1h:p'; //Вероятность грозы (%)
    // const cloudyCode = 'effective_cloud_cover:p'; //Облачность (%)

    // const todayWindSpeedResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${windSpeedCode}/${latitude},${longitude}/json?model=mix`);
    // const todayWindSpeedResult = await todayWindSpeedResponse.json();
    // const todayWindSpeed = todayWindSpeedResult.data[0].coordinates[0].dates[0].value;

    // const tomorrowWindSpeedResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${windSpeedCode}/${latitude},${longitude}/json?model=mix`);
    // const tomorrowWindSpeedResult = await tomorrowWindSpeedResponse.json();
    // const tomorrowWindSpeed = tomorrowWindSpeedResult.data[0].coordinates[0].dates[0].value;

    // const afterTomorrowWindSpeedResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${windSpeedCode}/${latitude},${longitude}/json?model=mix`);
    // const afterTomorrowWindSpeedResult = await afterTomorrowWindSpeedResponse.json();
    // const afterTomorrowWindSpeed = afterTomorrowWindSpeedResult.data[0].coordinates[0].dates[0].value;

    // const inThreeDaysWindSpeedResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${windSpeedCode}/${latitude},${longitude}/json?model=mix`);
    // const inThreeDaysWindSpeedResult = await inThreeDaysWindSpeedResponse.json();
    // const inThreeDaysWindSpeed = inThreeDaysWindSpeedResult.data[0].coordinates[0].dates[0].value;

    // const todayCloudBaseHeightResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${cloudBaseHeightCode}/${latitude},${longitude}/json?model=mix`);
    // const todayCloudBaseHeightResult = await todayCloudBaseHeightResponse.json();
    // const todayCloudBaseHeight = todayCloudBaseHeightResult.data[0].coordinates[0].dates[0].value;

    // const tomorrowCloudBaseHeightResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${cloudBaseHeightCode}/${latitude},${longitude}/json?model=mix`);
    // const tomorrowCloudBaseHeightResult = await tomorrowCloudBaseHeightResponse.json();
    // const tomorrowCloudBaseHeight = tomorrowCloudBaseHeightResult.data[0].coordinates[0].dates[0].value;

    // const afterTomorrowCloudBaseHeightResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${cloudBaseHeightCode}/${latitude},${longitude}/json?model=mix`);
    // const afterTomorrowCloudBaseHeightResult = await afterTomorrowCloudBaseHeightResponse.json();
    // const afterTomorrowCloudBaseHeight = afterTomorrowCloudBaseHeightResult.data[0].coordinates[0].dates[0].value;

    // const inThreeDaysCloudBaseHeightResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${cloudBaseHeightCode}/${latitude},${longitude}/json?model=mix`);
    // const inThreeDaysCloudBaseHeightResult = await inThreeDaysCloudBaseHeightResponse.json();
    // const inThreeDaysCloudBaseHeight = inThreeDaysCloudBaseHeightResult.data[0].coordinates[0].dates[0].value;

    // const todayWindDirectionResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${windDirectionCode}/${latitude},${longitude}/json?model=mix`);
    // const todayWindDirectionResult = await todayWindDirectionResponse.json();
    // const todayWindDirectionInDegrees = todayWindDirectionResult.data[0].coordinates[0].dates[0].value;
    // const todayWindDirection = normalizationOfWindDirection(todayWindDirectionInDegrees);

    // const tomorrowWindDirectionResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${windDirectionCode}/${latitude},${longitude}/json?model=mix`);
    // const tomorrowWindDirectionResult = await tomorrowWindDirectionResponse.json();
    // const tomorrowWindDirectionInDegrees = tomorrowWindDirectionResult.data[0].coordinates[0].dates[0].value;
    // const tomorrowWindDirection = normalizationOfWindDirection(tomorrowWindDirectionInDegrees);

    // const afterTomorrowWindDirectionResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${windDirectionCode}/${latitude},${longitude}/json?model=mix`);
    // const afterTomorrowWindDirectionResult = await afterTomorrowWindDirectionResponse.json();
    // const afterTomorrowWindDirectionInDegrees = afterTomorrowWindDirectionResult.data[0].coordinates[0].dates[0].value;
    // const afterTomorrowWindDirection = normalizationOfWindDirection(afterTomorrowWindDirectionInDegrees);

    // const inThreeDaysWindDirectionResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${windDirectionCode}/${latitude},${longitude}/json?model=mix`);
    // const inThreeDaysWindDirectionResult = await inThreeDaysWindDirectionResponse.json();
    // const inThreeDaysWindDirectionInDegrees = inThreeDaysWindDirectionResult.data[0].coordinates[0].dates[0].value;
    // const inThreeDaysWindDirection = normalizationOfWindDirection(inThreeDaysWindDirectionInDegrees);

    // const todayPrecipitationProbabilityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${precipitationProbabilityCode}/${latitude},${longitude}/json?model=mix`);
    // const todayPrecipitationProbabilityResult = await todayPrecipitationProbabilityResponse.json();
    // const todayPrecipitationProbability = todayPrecipitationProbabilityResult.data[0].coordinates[0].dates[0].value;

    // const tomorrowPrecipitationProbabilityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${precipitationProbabilityCode}/${latitude},${longitude}/json?model=mix`);
    // const tomorrowPrecipitationProbabilityResult = await tomorrowPrecipitationProbabilityResponse.json();
    // const tomorrowPrecipitationProbability = tomorrowPrecipitationProbabilityResult.data[0].coordinates[0].dates[0].value;

    // const afterTomorrowPrecipitationProbabilityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${precipitationProbabilityCode}/${latitude},${longitude}/json?model=mix`);
    // const afterTomorrowPrecipitationProbabilityResult = await afterTomorrowPrecipitationProbabilityResponse.json();
    // const afterTomorrowPrecipitationProbability = afterTomorrowPrecipitationProbabilityResult.data[0].coordinates[0].dates[0].value;

    // const inThreeDaysPrecipitationProbabilityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${precipitationProbabilityCode}/${latitude},${longitude}/json?model=mix`);
    // const inThreeDaysPrecipitationProbabilityResult = await inThreeDaysPrecipitationProbabilityResponse.json();
    // const inThreeDaysPrecipitationProbability = inThreeDaysPrecipitationProbabilityResult.data[0].coordinates[0].dates[0].value;

    // const todayTempResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${tempCode}/${latitude},${longitude}/json?model=mix`);
    // const todayTempResult = await todayTempResponse.json();
    // const todayTemp = todayTempResult.data[0].coordinates[0].dates[0].value;

    // const tomorrowTempResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${tempCode}/${latitude},${longitude}/json?model=mix`);
    // const tomorrowTempResult = await tomorrowTempResponse.json();
    // const tomorrowTemp = tomorrowTempResult.data[0].coordinates[0].dates[0].value;

    // const afterTomorrowTempResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${tempCode}/${latitude},${longitude}/json?model=mix`);
    // const afterTomorrowTempResult = await afterTomorrowTempResponse.json();
    // const afterTomorrowTemp = afterTomorrowTempResult.data[0].coordinates[0].dates[0].value;

    // const inThreeDaysTempResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${tempCode}/${latitude},${longitude}/json?model=mix`);
    // const inThreeDaysTempResult = await inThreeDaysTempResponse.json();
    // const inThreeDaysTemp = inThreeDaysTempResult.data[0].coordinates[0].dates[0].value;

    // const todayThunderstormActivityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${thunderstormActivityCode}/${latitude},${longitude}/json?model=mix`);
    // const todayThunderstormActivityResult = await todayThunderstormActivityResponse.json();
    // const todayThunderstormActivity = todayThunderstormActivityResult.data[0].coordinates[0].dates[0].value;

    // const tomorrowThunderstormActivityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${thunderstormActivityCode}/${latitude},${longitude}/json?model=mix`);
    // const tomorrowThunderstormActivityResult = await tomorrowThunderstormActivityResponse.json();
    // const tomorrowThunderstormActivity = tomorrowThunderstormActivityResult.data[0].coordinates[0].dates[0].value;

    // const afterTomorrowThunderstormActivityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${thunderstormActivityCode}/${latitude},${longitude}/json?model=mix`);
    // const afterTomorrowThunderstormActivityResult = await afterTomorrowThunderstormActivityResponse.json();
    // const afterTomorrowThunderstormActivity = afterTomorrowThunderstormActivityResult.data[0].coordinates[0].dates[0].value;

    // const inThreeDaysThunderstormActivityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${thunderstormActivityCode}/${latitude},${longitude}/json?model=mix`);
    // const inThreeDaysThunderstormActivityResult = await inThreeDaysThunderstormActivityResponse.json();
    // const inThreeDaysThunderstormActivity = inThreeDaysThunderstormActivityResult.data[0].coordinates[0].dates[0].value;

    // const todayCloudyResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${cloudyCode}/${latitude},${longitude}/json?model=mix`);
    // const todayCloudyResult = await todayCloudyResponse.json();
    // const todayCloudy = todayCloudyResult.data[0].coordinates[0].dates[0].value;

    // const tomorrowCloudyResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${cloudyCode}/${latitude},${longitude}/json?model=mix`);
    // const tomorrowCloudyResult = await tomorrowCloudyResponse.json();
    // const tomorrowCloudy = tomorrowCloudyResult.data[0].coordinates[0].dates[0].value;

    // const afterTomorrowCloudyResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${cloudyCode}/${latitude},${longitude}/json?model=mix`);
    // const afterTomorrowCloudyResult = await afterTomorrowCloudyResponse.json();
    // const afterTomorrowCloudy = afterTomorrowCloudyResult.data[0].coordinates[0].dates[0].value;

    // const inThreeDaysCloudyResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${cloudyCode}/${latitude},${longitude}/json?model=mix`);
    // const inThreeDaysCloudyResult = await inThreeDaysCloudyResponse.json();
    // const inThreeDaysCloudy = inThreeDaysCloudyResult.data[0].coordinates[0].dates[0].value;

    // const currentWeather = {
    //   todayWindSpeed,
    //   tomorrowWindSpeed,
    //   afterTomorrowWindSpeed,
    //   inThreeDaysWindSpeed,
    //   todayCloudBaseHeight,
    //   tomorrowCloudBaseHeight,
    //   afterTomorrowCloudBaseHeight,
    //   inThreeDaysCloudBaseHeight,
    //   todayWindDirection,
    //   tomorrowWindDirection,
    //   afterTomorrowWindDirection,
    //   inThreeDaysWindDirection,
    //   todayPrecipitationProbability,
    //   tomorrowPrecipitationProbability,
    //   afterTomorrowPrecipitationProbability,
    //   inThreeDaysPrecipitationProbability,
    //   todayTemp,
    //   tomorrowTemp,
    //   afterTomorrowTemp,
    //   inThreeDaysTemp,
    //   todayThunderstormActivity,
    //   tomorrowThunderstormActivity,
    //   afterTomorrowThunderstormActivity,
    //   inThreeDaysThunderstormActivity,
    //   todayCloudy,
    //   tomorrowCloudy,
    //   afterTomorrowCloudy,
    //   inThreeDaysCloudy,
    // };

    // Заглушка для meteomatics (закомментировать при демонстрации)
    const currentWeather = {
      todayWindSpeed: '3.1',
      tomorrowWindSpeed: '4.6',
      afterTomorrowWindSpeed: '5.5',
      inThreeDaysWindSpeed: '5',
      todayCloudBaseHeight: '3992.4',
      tomorrowCloudBaseHeight: '346.3',
      afterTomorrowCloudBaseHeight: '1100.2',
      inThreeDaysCloudBaseHeight: '469.2',
      todayWindDirection: 'Север',
      tomorrowWindDirection: 'Юг',
      afterTomorrowWindDirection: 'Юго-Запад',
      inThreeDaysWindDirection: 'Юг',
      todayPrecipitationProbability: '1',
      tomorrowPrecipitationProbability: '8.4',
      afterTomorrowPrecipitationProbability: '1',
      inThreeDaysPrecipitationProbability: '3.4',
      todayTemp: '28.4',
      tomorrowTemp: '20.5',
      afterTomorrowTemp: '24',
      inThreeDaysTemp: '18.1',
      todayThunderstormActivity: '37.2',
      tomorrowThunderstormActivity: '1',
      afterTomorrowThunderstormActivity: '1',
      inThreeDaysThunderstormActivity: '1',
      todayCloudy: '38.8',
      tomorrowCloudy: '96.9',
      afterTomorrowCloudy: '22.3',
      inThreeDaysCloudy: '100',
    };



    res.json(currentWeather);

  })

module.exports = router;
