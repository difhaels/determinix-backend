const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: String,
  createdAt: {type: Date, default: Date.now},
  description: String,
  banner: String,
  imgAtt1: String,
  imgAtt2: String,
  imgAtt3: String,
  att1description: String,
  att2description: String,
  att3description: String,
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
