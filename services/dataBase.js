const mongoose = require('mongoose');

const Album = require('../schemas/album');
const AlbumsCollection = require('../schemas/albumsCollection');

const AlbumModel = mongoose.model('Album', Album);
const AlbumsCollectionModel = mongoose.model('AlbumsCollection', AlbumsCollection);

function saveAlbumsCollection(albums) {
    const collection = new AlbumsCollectionModel({
        genre,
        year,
        albums: albums.map((album) => new AlbumModel(album))
    });

    collection.save( (error, item) => {
        if (error) return console.error(error);
        console.log(item);
    });

    return collection;
}

module.exports = {
    saveAlbumsCollection
};