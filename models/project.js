const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  createdAt: {type: Date, default: Date.now},
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  imgUrl: [String],
  att1: String,
  att2: String,
  att3: String,
  description: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
