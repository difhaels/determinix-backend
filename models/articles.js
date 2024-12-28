const mongoose = require('mongoose');

const articlestSchema = new mongoose.Schema({
  title: String,
  date: String,
  writer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  type: String,
  short: String,
  img: String,
});

const Articles = mongoose.model('Articles', articlestSchema);

module.exports = Articles;
