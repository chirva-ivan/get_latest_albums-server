const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Album = new Schema({
    author: { type: String },
    title: { type: String },
    releaseDate: { type: String },
    tags: { type: Array, default: [] },
    rating: { type: Date, default: null }
});

export default Album;