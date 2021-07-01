const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Ivent = require('../models/iventModel');
const User = require('../models/user');
const fetch = require('node-fetch');
const authController = require('../controllers/auth.controller')

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

const normalizationOfvalues = (value) => {
  if (value == '-666') {
    return ('-')
  }
  
  return value;
}

router.route('/')
  //get all events from data base
  .get(async (req, res) => {
    try {
      const allIvents = await Ivent.find().populate('passengerPending').populate('passengerAccepted')
        .populate('passengerRejected').populate('creator');
      res.json({ allIvents });
    } catch (error) {
      console.error(error.message);
    }
  })
  // create new event
  .post(async (req, res) => {
    try {
      const newIventData = { ...req.body, creator: mongoose.Types.ObjectId(req.body.creator) };
      let newIvent = await Ivent.create(newIventData);
      newIvent = await Ivent.findById(newIvent._id).populate('passengerPending').populate('passengerAccepted')
        .populate('passengerRejected').populate('creator');
      res.status(200).json(newIvent);
    } catch (error) {
      console.error(error.message);
    }
  })
  .put(async (req, res) => {
    const meteomaticsLogin = 'student_roman';
    const meteomaticsParol = '06XCKf7hBdqoE';

    const { latitude, longitude } = req.body;
    const todayNotFormat = new Date();
    const today = todayNotFormat.toISOString().split('.')[0];
    const tomorrow = new Date(todayNotFormat.getTime() + (24 * 60 * 60 * 1000)).toISOString().split('.')[0];
    const afterTomorrow = new Date(todayNotFormat.getTime() + ((24 * 60 * 60 * 1000) * 2)).toISOString().split('.')[0];
    const inThreeDays = new Date(todayNotFormat.getTime() + ((24 * 60 * 60 * 1000) * 3)).toISOString().split('.')[0];

    const windSpeedCode = 'wind_speed_10m:ms'; //Сила ветра (м/с)
    const cloudBaseHeightCode = 'cloud_base_agl:m'; //Высата облачной базы (м)
    const windDirectionCode = 'wind_dir_10m:d'; //Направление ветра (от вет от api в градусах)
    const precipitationProbabilityCode = 'prob_precip_1h:p'; //Вероятность осадков (%)
    const tempCode = 't_0m:C'; //Температура воздуха (град Цельсия)
    const thunderstormActivityCode = 'prob_tstorm_1h:p'; //Вероятность грозы (%)
    const cloudyCode = 'effective_cloud_cover:p'; //Облачность (%)

    const todayWindSpeedResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${windSpeedCode}/${latitude},${longitude}/json?model=mix`);
    const todayWindSpeedResult = await todayWindSpeedResponse.json();
    const todayWindSpeed = todayWindSpeedResult.data[0].coordinates[0].dates[0].value;

    const tomorrowWindSpeedResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${windSpeedCode}/${latitude},${longitude}/json?model=mix`);
    const tomorrowWindSpeedResult = await tomorrowWindSpeedResponse.json();
    const tomorrowWindSpeed = tomorrowWindSpeedResult.data[0].coordinates[0].dates[0].value;

    const afterTomorrowWindSpeedResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${windSpeedCode}/${latitude},${longitude}/json?model=mix`);
    const afterTomorrowWindSpeedResult = await afterTomorrowWindSpeedResponse.json();
    const afterTomorrowWindSpeed = afterTomorrowWindSpeedResult.data[0].coordinates[0].dates[0].value;

    const inThreeDaysWindSpeedResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${windSpeedCode}/${latitude},${longitude}/json?model=mix`);
    const inThreeDaysWindSpeedResult = await inThreeDaysWindSpeedResponse.json();
    const inThreeDaysWindSpeed = inThreeDaysWindSpeedResult.data[0].coordinates[0].dates[0].value;

    const todayCloudBaseHeightResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${cloudBaseHeightCode}/${latitude},${longitude}/json?model=mix`);
    const todayCloudBaseHeightResult = await todayCloudBaseHeightResponse.json();
    const todayCloudBaseHeightNotNorm = todayCloudBaseHeightResult.data[0].coordinates[0].dates[0].value;
    const todayCloudBaseHeight = normalizationOfvalues(todayCloudBaseHeightNotNorm);

    const tomorrowCloudBaseHeightResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${cloudBaseHeightCode}/${latitude},${longitude}/json?model=mix`);
    const tomorrowCloudBaseHeightResult = await tomorrowCloudBaseHeightResponse.json();
    const tomorrowCloudBaseHeightNotNorm = tomorrowCloudBaseHeightResult.data[0].coordinates[0].dates[0].value;
    const tomorrowCloudBaseHeight = normalizationOfvalues(tomorrowCloudBaseHeightNotNorm);

    const afterTomorrowCloudBaseHeightResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${cloudBaseHeightCode}/${latitude},${longitude}/json?model=mix`);
    const afterTomorrowCloudBaseHeightResult = await afterTomorrowCloudBaseHeightResponse.json();
    const afterTomorrowCloudBaseHeightNotNorm = afterTomorrowCloudBaseHeightResult.data[0].coordinates[0].dates[0].value;
    const afterTomorrowCloudBaseHeight = normalizationOfvalues(afterTomorrowCloudBaseHeightNotNorm);

    const inThreeDaysCloudBaseHeightResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${cloudBaseHeightCode}/${latitude},${longitude}/json?model=mix`);
    const inThreeDaysCloudBaseHeightResult = await inThreeDaysCloudBaseHeightResponse.json();
    const inThreeDaysCloudBaseHeightNotNorm = inThreeDaysCloudBaseHeightResult.data[0].coordinates[0].dates[0].value;
    const inThreeDaysCloudBaseHeight = normalizationOfvalues(inThreeDaysCloudBaseHeightNotNorm);

    const todayWindDirectionResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${windDirectionCode}/${latitude},${longitude}/json?model=mix`);
    const todayWindDirectionResult = await todayWindDirectionResponse.json();
    const todayWindDirectionInDegrees = todayWindDirectionResult.data[0].coordinates[0].dates[0].value;
    const todayWindDirection = normalizationOfWindDirection(todayWindDirectionInDegrees);

    const tomorrowWindDirectionResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${windDirectionCode}/${latitude},${longitude}/json?model=mix`);
    const tomorrowWindDirectionResult = await tomorrowWindDirectionResponse.json();
    const tomorrowWindDirectionInDegrees = tomorrowWindDirectionResult.data[0].coordinates[0].dates[0].value;
    const tomorrowWindDirection = normalizationOfWindDirection(tomorrowWindDirectionInDegrees);

    const afterTomorrowWindDirectionResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${windDirectionCode}/${latitude},${longitude}/json?model=mix`);
    const afterTomorrowWindDirectionResult = await afterTomorrowWindDirectionResponse.json();
    const afterTomorrowWindDirectionInDegrees = afterTomorrowWindDirectionResult.data[0].coordinates[0].dates[0].value;
    const afterTomorrowWindDirection = normalizationOfWindDirection(afterTomorrowWindDirectionInDegrees);

    const inThreeDaysWindDirectionResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${windDirectionCode}/${latitude},${longitude}/json?model=mix`);
    const inThreeDaysWindDirectionResult = await inThreeDaysWindDirectionResponse.json();
    const inThreeDaysWindDirectionInDegrees = inThreeDaysWindDirectionResult.data[0].coordinates[0].dates[0].value;
    const inThreeDaysWindDirection = normalizationOfWindDirection(inThreeDaysWindDirectionInDegrees);

    const todayPrecipitationProbabilityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${precipitationProbabilityCode}/${latitude},${longitude}/json?model=mix`);
    const todayPrecipitationProbabilityResult = await todayPrecipitationProbabilityResponse.json();
    const todayPrecipitationProbabilityNotNorm = todayPrecipitationProbabilityResult.data[0].coordinates[0].dates[0].value;
    const todayPrecipitationProbability = normalizationOfvalues(todayPrecipitationProbabilityNotNorm);

    const tomorrowPrecipitationProbabilityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${precipitationProbabilityCode}/${latitude},${longitude}/json?model=mix`);
    const tomorrowPrecipitationProbabilityResult = await tomorrowPrecipitationProbabilityResponse.json();
    const tomorrowPrecipitationProbabilityNotNorm = tomorrowPrecipitationProbabilityResult.data[0].coordinates[0].dates[0].value;
    const tomorrowPrecipitationProbability = normalizationOfvalues(tomorrowPrecipitationProbabilityNotNorm);

    const afterTomorrowPrecipitationProbabilityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${precipitationProbabilityCode}/${latitude},${longitude}/json?model=mix`);
    const afterTomorrowPrecipitationProbabilityResult = await afterTomorrowPrecipitationProbabilityResponse.json();
    const afterTomorrowPrecipitationProbabilityNotNorm = afterTomorrowPrecipitationProbabilityResult.data[0].coordinates[0].dates[0].value;
    const afterTomorrowPrecipitationProbability = normalizationOfvalues(afterTomorrowPrecipitationProbabilityNotNorm);

    const inThreeDaysPrecipitationProbabilityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${precipitationProbabilityCode}/${latitude},${longitude}/json?model=mix`);
    const inThreeDaysPrecipitationProbabilityResult = await inThreeDaysPrecipitationProbabilityResponse.json();
    const inThreeDaysPrecipitationProbabilityNotNorm = inThreeDaysPrecipitationProbabilityResult.data[0].coordinates[0].dates[0].value;
    const inThreeDaysPrecipitationProbability = normalizationOfvalues(inThreeDaysPrecipitationProbabilityNotNorm);

    const todayTempResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${tempCode}/${latitude},${longitude}/json?model=mix`);
    const todayTempResult = await todayTempResponse.json();
    const todayTemp = todayTempResult.data[0].coordinates[0].dates[0].value;

    const tomorrowTempResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${tempCode}/${latitude},${longitude}/json?model=mix`);
    const tomorrowTempResult = await tomorrowTempResponse.json();
    const tomorrowTemp = tomorrowTempResult.data[0].coordinates[0].dates[0].value;

    const afterTomorrowTempResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${tempCode}/${latitude},${longitude}/json?model=mix`);
    const afterTomorrowTempResult = await afterTomorrowTempResponse.json();
    const afterTomorrowTemp = afterTomorrowTempResult.data[0].coordinates[0].dates[0].value;

    const inThreeDaysTempResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${tempCode}/${latitude},${longitude}/json?model=mix`);
    const inThreeDaysTempResult = await inThreeDaysTempResponse.json();
    const inThreeDaysTemp = inThreeDaysTempResult.data[0].coordinates[0].dates[0].value;

    const todayThunderstormActivityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${thunderstormActivityCode}/${latitude},${longitude}/json?model=mix`);
    const todayThunderstormActivityResult = await todayThunderstormActivityResponse.json();
    const todayThunderstormActivityNotNorm = todayThunderstormActivityResult.data[0].coordinates[0].dates[0].value;
    const todayThunderstormActivity = normalizationOfvalues(todayThunderstormActivityNotNorm);

    const tomorrowThunderstormActivityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${thunderstormActivityCode}/${latitude},${longitude}/json?model=mix`);
    const tomorrowThunderstormActivityResult = await tomorrowThunderstormActivityResponse.json();
    const tomorrowThunderstormActivityNotNorm = tomorrowThunderstormActivityResult.data[0].coordinates[0].dates[0].value;
    const tomorrowThunderstormActivity = normalizationOfvalues(tomorrowThunderstormActivityNotNorm);

    const afterTomorrowThunderstormActivityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${thunderstormActivityCode}/${latitude},${longitude}/json?model=mix`);
    const afterTomorrowThunderstormActivityResult = await afterTomorrowThunderstormActivityResponse.json();
    const afterTomorrowThunderstormActivityNotNorm = afterTomorrowThunderstormActivityResult.data[0].coordinates[0].dates[0].value;
    const afterTomorrowThunderstormActivity = normalizationOfvalues(afterTomorrowThunderstormActivityNotNorm);

    const inThreeDaysThunderstormActivityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${thunderstormActivityCode}/${latitude},${longitude}/json?model=mix`);
    const inThreeDaysThunderstormActivityResult = await inThreeDaysThunderstormActivityResponse.json();
    const inThreeDaysThunderstormActivityNotNorm = inThreeDaysThunderstormActivityResult.data[0].coordinates[0].dates[0].value;
    const inThreeDaysThunderstormActivity = normalizationOfvalues(inThreeDaysThunderstormActivityNotNorm);

    const todayCloudyResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${today}.000+03:00/${cloudyCode}/${latitude},${longitude}/json?model=mix`);
    const todayCloudyResult = await todayCloudyResponse.json();
    const todayCloudyNotNorm = todayCloudyResult.data[0].coordinates[0].dates[0].value;
    const todayCloudy = normalizationOfvalues(todayCloudyNotNorm);

    const tomorrowCloudyResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${tomorrow}.000+03:00/${cloudyCode}/${latitude},${longitude}/json?model=mix`);
    const tomorrowCloudyResult = await tomorrowCloudyResponse.json();
    const tomorrowCloudyNotNorm = tomorrowCloudyResult.data[0].coordinates[0].dates[0].value;
    const tomorrowCloudy = normalizationOfvalues(tomorrowCloudyNotNorm);

    const afterTomorrowCloudyResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${afterTomorrow}.000+03:00/${cloudyCode}/${latitude},${longitude}/json?model=mix`);
    const afterTomorrowCloudyResult = await afterTomorrowCloudyResponse.json();
    const afterTomorrowCloudyNotNorm = afterTomorrowCloudyResult.data[0].coordinates[0].dates[0].value;
    const afterTomorrowCloudy = normalizationOfvalues(afterTomorrowCloudyNotNorm);

    const inThreeDaysCloudyResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${inThreeDays}.000+03:00/${cloudyCode}/${latitude},${longitude}/json?model=mix`);
    const inThreeDaysCloudyResult = await inThreeDaysCloudyResponse.json();
    const inThreeDaysCloudyNotNorm = inThreeDaysCloudyResult.data[0].coordinates[0].dates[0].value;
    const inThreeDaysCloudy = normalizationOfvalues(inThreeDaysCloudyNotNorm);

    const currentWeather = {
      todayWindSpeed,
      tomorrowWindSpeed,
      afterTomorrowWindSpeed,
      inThreeDaysWindSpeed,
      todayCloudBaseHeight,
      tomorrowCloudBaseHeight,
      afterTomorrowCloudBaseHeight,
      inThreeDaysCloudBaseHeight,
      todayWindDirection,
      tomorrowWindDirection,
      afterTomorrowWindDirection,
      inThreeDaysWindDirection,
      todayPrecipitationProbability,
      tomorrowPrecipitationProbability,
      afterTomorrowPrecipitationProbability,
      inThreeDaysPrecipitationProbability,
      todayTemp,
      tomorrowTemp,
      afterTomorrowTemp,
      inThreeDaysTemp,
      todayThunderstormActivity,
      tomorrowThunderstormActivity,
      afterTomorrowThunderstormActivity,
      inThreeDaysThunderstormActivity,
      todayCloudy,
      tomorrowCloudy,
      afterTomorrowCloudy,
      inThreeDaysCloudy,
    };

    // Заглушка для meteomatics (закомментировать при демонстрации)
    // const currentWeather = {
    //   todayWindSpeed: '3.1',
    //   tomorrowWindSpeed: '4.6',
    //   afterTomorrowWindSpeed: '5.5',
    //   inThreeDaysWindSpeed: '5',
    //   todayCloudBaseHeight: '3992.4',
    //   tomorrowCloudBaseHeight: '346.3',
    //   afterTomorrowCloudBaseHeight: '1100.2',
    //   inThreeDaysCloudBaseHeight: '469.2',
    //   todayWindDirection: 'Север',
    //   tomorrowWindDirection: 'Юг',
    //   afterTomorrowWindDirection: 'Юго-Запад',
    //   inThreeDaysWindDirection: 'Юг',
    //   todayPrecipitationProbability: '1',
    //   tomorrowPrecipitationProbability: '8.4',
    //   afterTomorrowPrecipitationProbability: '1',
    //   inThreeDaysPrecipitationProbability: '3.4',
    //   todayTemp: '28.4',
    //   tomorrowTemp: '20.5',
    //   afterTomorrowTemp: '24',
    //   inThreeDaysTemp: '18.1',
    //   todayThunderstormActivity: '37.2',
    //   tomorrowThunderstormActivity: '1',
    //   afterTomorrowThunderstormActivity: '1',
    //   inThreeDaysThunderstormActivity: '1',
    //   todayCloudy: '38.8',
    //   tomorrowCloudy: '96.9',
    //   afterTomorrowCloudy: '22.3',
    //   inThreeDaysCloudy: '100',
    // };



    res.json(currentWeather);

  })
  //passenger add himsalf in event
  .patch(async (req, res) => {
    try {
      const { selectIventId, currentUserId } = req.body;

      let selectIvent = await Ivent.findById(selectIventId);
      if (selectIvent.passengerPending.includes(currentUserId) ||
        selectIvent.passengerAccepted.includes(currentUserId) ||
        selectIvent.passengerRejected.includes(currentUserId)) {
        return res.sendStatus(418);
      }
      await Ivent.updateOne({ _id: selectIventId }, { $push: { passengerPending: currentUserId } });
      const selectIventWithNewPassenger = await Ivent.findById(selectIventId)
        .populate('passengerPending').populate('passengerAccepted')
        .populate('passengerRejected').populate('creator');
      return res.status(200).json(selectIventWithNewPassenger);

    } catch (error) {
      console.error(error.message);
    }
  })
  //passenger delete himsalfe from ivent
  .delete(async (req, res) => {
    try {
      const { selectIventId, currentUserId } = req.body;

      let selectIvent = await Ivent.findById(selectIventId);
      if (!selectIvent.passengerPending.includes(currentUserId) &&
        !selectIvent.passengerAccepted.includes(currentUserId) &&
        !selectIvent.passengerRejected.includes(currentUserId)) {
        return res.sendStatus(418);
      } else if (selectIvent.passengerPending.includes(currentUserId)) {
        selectIvent.passengerPending.splice(selectIvent.passengerPending.indexOf(currentUserId), 1);
      } else if (selectIvent.passengerAccepted.includes(currentUserId)) {
        selectIvent.passengerAccepted.splice(selectIvent.passengerAccepted.indexOf(currentUserId), 1);
      } else if (selectIvent.passengerRejected.includes(currentUserId)) {
        selectIvent.passengerRejected.splice(selectIvent.passengerRejected.indexOf(currentUserId), 1);
      }
      await selectIvent.save();
      const selectIventWithOutNewPassenger = await Ivent.findById(selectIventId)
        .populate('passengerPending').populate('passengerAccepted')
        .populate('passengerRejected').populate('creator');
      return res.status(200).json(selectIventWithOutNewPassenger);

    } catch (error) {
      console.error(error.message);
    }
  });

// get select event for modal
router.route('/:lotitude/:longitude')
  .get(async (req, res) => {
    const { lotitude, longitude } = req.params;
    try {
      const allIvents = await Ivent.find();
      const selectIventArr = allIvents.filter((elem) => {
        return (
          String(elem.coords[0]) === lotitude && String(elem.coords[1]) === longitude
        );
      })
      const selectIvent = await Ivent.findById(selectIventArr[0]._id)
        .populate('passengerPending').populate('passengerAccepted')
        .populate('passengerRejected').populate('creator');;
      res.status(200).json(selectIvent);
    } catch (error) {
      console.error(error.message);
    }
  })

router.route('/status')
  // to accept
  .post(async (req, res) => {
    try {
      const { selectIventId, selectUserId } = req.body;

      const selectIvent = await Ivent.findById(selectIventId);
      if (!selectIvent.passengerPending.includes(selectUserId)) {
        return res.sendStatus(418);
      }
      selectIvent.passengerPending.splice(selectIvent.passengerPending.indexOf(selectUserId), 1);
      await selectIvent.save();
      await Ivent.updateOne({ _id: selectIventId }, { $push: { passengerAccepted: selectUserId } });

      const selectIventWithAcceptPassenger = await Ivent.findById(selectIventId)
        .populate('passengerPending').populate('passengerAccepted')
        .populate('passengerRejected').populate('creator');
      return res.status(200).json(selectIventWithAcceptPassenger);
    } catch (error) {
      console.error(error.message);
    }
  })
  // to reject
  .delete(async (req, res) => {
    try {
      const { selectIventId, selectUserId } = req.body;

      const selectIvent = await Ivent.findById(selectIventId);
      if (selectIvent.passengerRejected.includes(selectUserId)) {
        return res.sendStatus(418);
      } else if (selectIvent.passengerPending.includes(selectUserId)) {
        selectIvent.passengerPending.splice(selectIvent.passengerPending.indexOf(selectUserId), 1);
      } else if (selectIvent.passengerAccepted.includes(selectUserId)) {
        selectIvent.passengerAccepted.splice(selectIvent.passengerAccepted.indexOf(selectUserId), 1);
      }
      await selectIvent.save();
      await Ivent.updateOne({ _id: selectIventId }, { $push: { passengerRejected: selectUserId } });

      const selectIventWithRejectPassenger = await Ivent.findById(selectIventId)
        .populate('passengerPending').populate('passengerAccepted')
        .populate('passengerRejected').populate('creator');
      return res.status(200).json(selectIventWithRejectPassenger);
    } catch (error) {
      console.error(error.message);
    }
  })
  // to pending
  .patch(async (req, res) => {
    try {
      const { selectIventId, selectUserId } = req.body;

      const selectIvent = await Ivent.findById(selectIventId);
      if (!selectIvent.passengerAccepted.includes(selectUserId)) {
        return res.sendStatus(418);
      }
      selectIvent.passengerAccepted.splice(selectIvent.passengerAccepted.indexOf(selectUserId), 1);
      await selectIvent.save();

      await Ivent.updateOne({ _id: selectIventId }, { $push: { passengerPending: selectUserId } });

      const selectIventWithPendingPassenger = await Ivent.findById(selectIventId)
        .populate('passengerPending').populate('passengerAccepted')
        .populate('passengerRejected').populate('creator');
      return res.status(200).json(selectIventWithPendingPassenger);
    } catch (error) {
      console.error(error.message);
    }
  })



module.exports = router;
