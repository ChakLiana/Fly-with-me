const mongoose = require("mongoose");

const Ivent = mongoose.model("Ivent", {
  coords: {
    type: Array,
    required: true,
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateOfEvent: Date,
  IventImg: String,
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  passengerPending: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  passengerAccepted: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  passengerRejected: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  price: String,
  description: String,
  stopList: String,
  currentWeather: {
    todayWindSpeed: String,
    tomorrowWindSpeed: String,
    afterTomorrowWindSpeed: String,
    inThreeDaysWindSpeed: String,
    todayCloudBaseHeight: String,
    tomorrowCloudBaseHeight: String,
    afterTomorrowCloudBaseHeight: String,
    inThreeDaysCloudBaseHeight: String,
    todayWindDirection: String,
    tomorrowWindDirection: String,
    afterTomorrowWindDirection: String,
    inThreeDaysWindDirection: String,
    todayPrecipitationProbability: String,
    tomorrowPrecipitationProbability: String,
    afterTomorrowPrecipitationProbability: String,
    inThreeDaysPrecipitationProbability: String,
    todayTemp: String,
    tomorrowTemp: String,
    afterTomorrowTemp: String,
    inThreeDaysTemp: String,
    todayThunderstormActivity: String,
    tomorrowThunderstormActivity: String,
    afterTomorrowThunderstormActivity: String,
    inThreeDaysThunderstormActivity: String,
    todayCloudy: String,
    tomorrowCloudy: String,
    afterTomorrowCloudy: String,
    inThreeDaysCloudy: String,
  },
});

module.exports = Ivent;
