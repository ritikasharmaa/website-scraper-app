const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
  website: String,
  socialProfiles: {
    facebook: String,
    linkedin: String,
    twitter: String,
    instagram: String
  },
  address: String,
  phoneNumber: String,
  email: String,
  screenshot: String
});

module.exports = mongoose.model('Company', companySchema);
