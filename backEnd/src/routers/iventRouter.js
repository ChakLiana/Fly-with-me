const express = require('express');
const router = express.Router();
const Ivent = require('../models/iventModel');

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

  module.exports = router;