const express = require('express');
const router = express.Router();
const Ivent = require('../models/iventModel');
const fetch = require('node-fetch');

router.route('/')
  .get(async (req, res) => {
    try {
      const allIvents = await Ivent.find();
      res.json({ allIvents });
    } catch (error) {
      console.error(error.message);
    }
  })
  .post(async (req, res) => {
    const newCoords = req.body.formData;
    try {
      const newIvent = await Ivent.create({ coords: newCoords });
      res.status(200).json(newIvent);
    } catch (error) {
      console.error(error.message);
    }
  })
  .patch(async (req, res) => {
    const meteomaticsLogin = 'elbrus_chakaeva';
    const meteomaticsParol = '4JZUFd82paqbI';

    const { latitude, longitude } = req.body;
    const date = new Date().toISOString().split('.')[0];

    const windSpeedCode = 'wind_speed_10m:ms';
    const cloudBaseHeightCode = 'cloud_base_agl:m';
    const windDirectionCode = 'wind_dir_10m:d';
    const precipitationProbabilityCode = 'prob_precip_1h:p';
    const tempCode = 't_0m:C';

    const windSpeedResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${date}.000+03:00/${windSpeedCode}/${latitude},${longitude}/json?model=mix`);
    const windSpeedResult = await windSpeedResponse.json();
    const windSpeed = windSpeedResult.data[0].coordinates[0].dates[0].value;

    const cloudBaseHeightResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${date}.000+03:00/${cloudBaseHeightCode}/${latitude},${longitude}/json?model=mix`);
    const cloudBaseHeightResult = await cloudBaseHeightResponse.json();
    const cloudBaseHeight = cloudBaseHeightResult.data[0].coordinates[0].dates[0].value;

    const windDirectionResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${date}.000+03:00/${windDirectionCode}/${latitude},${longitude}/json?model=mix`);
    const windDirectionResult = await windDirectionResponse.json();
    const windDirection = windDirectionResult.data[0].coordinates[0].dates[0].value;

    const precipitationProbabilityResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${date}.000+03:00/${precipitationProbabilityCode}/${latitude},${longitude}/json?model=mix`);
    const precipitationProbabilityResult = await precipitationProbabilityResponse.json();
    const precipitationProbability = precipitationProbabilityResult.data[0].coordinates[0].dates[0].value;

    const tempResponse = await fetch(`https://${meteomaticsLogin}:${meteomaticsParol}@api.meteomatics.com/${date}.000+03:00/${tempCode}/${latitude},${longitude}/json?model=mix`);
    const tempResult = await tempResponse.json();
    const temp = tempResult.data[0].coordinates[0].dates[0].value;

    const currentWeather = {
      windSpeed,
      cloudBaseHeight,
      windDirection,
      precipitationProbability,
      temp,
    };

    res.json(currentWeather);

  })

module.exports = router;
