const axios = require('axios');
const rateYourMusicService = require('./rateYourMusic');

function getAlbumsList(
    year = '2010s', genre = 'ambient'
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

    return axios.get(url, {params}).then(
        (response) => rateYourMusicService.parse(response.data)
    );
}

module.exports = {
    getAlbumsList
};

