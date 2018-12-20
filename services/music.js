const axios = require('axios');

function getAlbumsList(
    year = 2018, genres = 'ambient'
) {
    const url = 'https://rateyourmusic.com/customchart';
    const params = {
        page: 1,
        include_child_genres_chk: 1,
        include_child_genres: 1,
        genre_include :1,
        chart_type: 'top',
        type: 'album',
        year,
        genres
    };

    return axios.get(url, params).then((response) => {
        console.log(response);
    });
}

module.exports = {
    getAlbumsList
};

