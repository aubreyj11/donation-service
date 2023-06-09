const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
  