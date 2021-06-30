const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Ivent = require("../models/iventModel");
const { findById } = require("../models/user");
const { route } = require("./iventRouter");

router.route("/").delete(async (req, res) => {
  try {
    const { selectIventId } = req.body;

    const newIvents = await Ivent.findByIdAndDelete(selectIventId);

    return res.sendStatus(200);
  } catch (error) {
    console.error("попали в ошибку", error.message);
  }
});

module.exports = router;
