const musicService = require('./music');

function startPoling(delay = 2000) {
    setTimeout(() => {
        musicService.getAlbumsList()
    }, delay);
}

module.exports = {
    startPoling
};