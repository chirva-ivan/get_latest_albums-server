const musicService = require('./music');

function startPoling(delay = 2000) {
    musicService.getAlbumsList();

    setTimeout(() => {
        startPoling(delay);
    }, delay);
}

module.exports = {
    startPoling
};