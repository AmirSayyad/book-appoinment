var mongoose = require('mongoose')

var bookingSchema = mongoose.Schema({
    buyer_id: {
        type: String
    },
    seller_id: {
        type: String
    },
    date: {
        type: Date
    },
    time_slot: {
        type: String
    },
    booking_status: {
        type: String,
        default: 'pending'
    },
    buyer_name: {
        type: String
    },
    buyer_email: {
        type: String
    },
    buyer_phone:{
        type: String
    },
    seller_name: {
        type: String
    }
});

module.exports = mongoose.model('Bookings', bookingSchema);