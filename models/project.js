const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  createAt: {type: Date, default: Date.now},
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  imgUrlBanner: String,
  imgUrl1: String,
  imgUrl2: String,
  imgUrl3: String,
  description: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
