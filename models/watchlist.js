const mongoose = require('mongoose');

// Watchlist Shema
const watchlistSchema = mongoose.Schema({
    symbol: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    marketCap: {
        type: Number,
        required: false,
    },
    change: {
        type: Number,
        required: false,
    },
    peRatio: {
        type: Number,
        required: false,
    }
   
});

module.exports = mongoose.model('Watchlist', watchlistSchema);