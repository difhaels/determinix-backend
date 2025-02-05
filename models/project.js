const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  createdAt: {type: Date, default: Date.now},
  head: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  contributor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  description: String,
  banner: String,
  imgAtt1: String,
  imgAtt2: String,
  imgAtt3: String,
  att1description: String,
  att2description: String,
  att3description: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
