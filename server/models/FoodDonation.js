const mongoose = require('mongoose');

const { Schema } = mongoose;

const foodDonationSchema = new Schema({
    pickupTime: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    comment: {
        type: String
    }
}
)

const FoodDonation = mongoose.model('Food_Donation', foodDonationSchema);

module.exports = FoodDonation;