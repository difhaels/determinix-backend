const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  date: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  img: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
