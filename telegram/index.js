const { Composer, Markup } = require('micro-bot');
const musicService = require('../services/music');

const bot = new Composer();

const AMBIENT = 'ambient';
const ELECTRONIC = 'electronic';
const METAL = 'metal';
const POST_PUNK = 'post-punk';

bot.command('start', (ctx) =>
    ctx.replyWithMarkdown('start message', Markup
        .keyboard([[AMBIENT, ELECTRONIC, METAL, POST_PUNK]])
        .resize()
        .extra()
    )
);

bot.command('help', (ctx) => ctx.replyWithMarkdown('type any music tag for request'));

// TODO: refactor to telegram scenes
bot.hears([AMBIENT, ELECTRONIC, METAL, POST_PUNK], (ctx) => {
    const genre = ctx.update.message.text;

    ctx.replyWithMarkdown('select year:', Markup
        .keyboard([['2018', '2017']])
        .resize()
        .extra()
    ).then(() => {
        bot.hears(['2018', '2017'], (ctx) => {
            const year = ctx.update.message.text;

            ctx.replyWithMarkdown(`loading some ${genre}...`);

            musicService.getAlbumsList(year, genre).then((albums) => {
                const markup = albums.map((item) => {
                    return `<code>${item.author} - ${item.title}</code>\n<i>${item.date} | Rating: ${item.rating}</i>`
                });

                ctx.replyWithHTML(markup.join('\n\n'));
            })
        });
    });
});



module.exports = bot;