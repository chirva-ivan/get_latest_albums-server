const musicService = require('./music');

function startPoling() {
    setTimeout(() => {
        musicService.getAlbumsList()
    }, 2000);
}

module.exports = {
    startPoling
};