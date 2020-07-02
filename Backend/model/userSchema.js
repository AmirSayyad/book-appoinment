var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    role: {
        type: String
    }
});

module.exports = mongoose.model('Users', userSchema);