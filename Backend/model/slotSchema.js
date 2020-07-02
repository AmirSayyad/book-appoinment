var mongoose = require('mongoose')

var slotSchema = mongoose.Schema({
    seller_id: {
        type: String
    },
    slots: {
        type: Array
    }
});

module.exports = mongoose.model('Slots', slotSchema);