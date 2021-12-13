const mongoose = require('mongoose');

// Watchlist Shema
const contactSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Contact', contactSchema);