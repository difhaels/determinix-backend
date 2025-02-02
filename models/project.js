const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  createdAt: {type: Date, default: Date.now},
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  imgUrl: [String],
  description: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
