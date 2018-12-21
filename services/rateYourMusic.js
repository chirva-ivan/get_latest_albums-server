const cheerio = require('cheerio');

function parse(rawData) {
    const html = cheerio.load(rawData);

    return html('.mbgen tr')
        .map((index, domElement) => {
            const element = html(domElement);

            const author = element.find('a.artist').text();
            const title = element.find('a.album').text();
            const date = element.find('.chart_year').text();
            const rating = element.find('.scoreValue').text();
            const tags = element.find('.extra_metadata_genres .genre').map(
                (index, tagElement) => {
                    return html(tagElement).text();
                }
            ).get();

            return { author, title, date, rating, tags }
        })
        .get()
        .filter((item) => item.author && item.title);
}

module.exports = {
    parse
};