const { Composer, Markup } = require('micro-bot');
const session = require('telegraf/session');

const musicService = require('../services/music');

const bot = new Composer();

bot.use(session());

const AMBIENT = 'ambient';
const ELECTRONIC = 'electronic';
const METAL = 'metal';
const POST_PUNK = 'post-punk';

bot.command('start', (ctx) =>
    ctx.replyWithMarkdown('Select music genre from list below or type any other', Markup
        .keyboard([[AMBIENT, ELECTRONIC, METAL, POST_PUNK]])
        .resize()
        .extra()
    )
);

bot.command('help', (ctx) => ctx.replyWithMarkdown('Type any music genre for request'));

// TODO: refactor to telegram scenes
bot.on('text', (ctx) => {
    // TODO: add genre validation
    const genre = ctx.update.message.text;

    ctx.session.genre = genre;

    const year = ctx.update.message.text;

    ctx.replyWithMarkdown(`loading some ${genre}...`);

    musicService.getAlbumsList(year, genre).then((albums) => {
        const itemMarkups = albums.map((item) => getAlbumsListItemMarkups(item));
        ctx.replyWithHTML(itemMarkups.join('\n\n')).then(() => {
            ctx.replyWithMarkdown('Would you like to subscribe for updates', Markup
                .keyboard([['Y', 'N']])
                .resize()
                .extra()
            );

            bot.hears(['Y', 'N'], (ctx) => {
                // TODO: add subscription
            })
        });
    })
});

function getAlbumsListItemMarkups(item) {
    return `<code>${item.author} - ${item.title}</code>\n<i>${item.date} | Rating: ${item.rating}</i>`;
}



module.exports = bot;