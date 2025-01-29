const mongoose = require('mongoose');

const activitiesSchema = new mongoose.Schema({
  title: String,
  date: String,
  img: String,
});

const Activities = mongoose.model('Activities', activitiesSchema);

module.exports = Activities;
