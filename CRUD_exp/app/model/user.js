var mongoose = require("mongoose")

var schma = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    phone: String
});

var user = new mongoose.model('User', schma)

module.exports = user