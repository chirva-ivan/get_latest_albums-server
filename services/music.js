const axios = require('axios');
const mongoose = require('mongoose');
const rateYourMusicService = require('./rateYourMusic');
const Album = require('../schemas/album');
const AlbumsCollection = require('../schemas/albumsCollection');

const AlbumModel = mongoose.model('Album', Album);
const AlbumsCollectionModel = mongoose.model('AlbumsCollection', AlbumsCollection);

function getAlbumsList(
    year = '2018', genre = 'ambient'
) {
    const url = 'https://rateyourmusic.com/customchart';
    const params = {
        page: 1,
        include_child_genres_chk: 1,
        include_child_genres: 1,
        genre_include : 1,
        chart_type: 'top',
        type: 'album',
        year,
        genres: genre
    };

    return axios.get(url, { params }).then((response) => {
        return rateYourMusicService.parse(response.data);
    }).then((albums) => {
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
    });
}

module.exports = {
    getAlbumsList
};

