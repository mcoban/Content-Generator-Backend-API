const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebsiteSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sitename: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

let Website = mongoose.model('Website', WebsiteSchema);
module.exports = Website;