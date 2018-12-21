const mongoose = require('mongoose');
const Album = require('./album');

const Schema = mongoose.Schema;

const AlbumsCollection = new Schema({
    albums: [Album]
});

module.exports = AlbumsCollection;