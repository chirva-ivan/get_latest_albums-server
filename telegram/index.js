const { Composer, Markup } = require('micro-bot');
const Scene = require('telegraf/scenes/base');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const musicService = require('../services/music');

const bot = new Composer();
const stage = new Stage();

// suggestion genres
const AMBIENT = 'ambient';
const ELECTRONIC = 'electronic';
const METAL = 'metal';
const POST_PUNK = 'post-punk';

// scenes constants
const SUBSCRIPTION_SCENE = 'subscription';
const MUSIC_REQUEST_SCENE = 'music';

bot.command('start', (ctx) =>
    ctx.replyWithMarkdown('Select music genre from list below or type any other', Markup
        .keyboard([[AMBIENT, ELECTRONIC, METAL, POST_PUNK]])
        .resize()
        .extra()
    )
);

// music request scene
const music = new Scene(MUSIC_REQUEST_SCENE);
music.enter((ctx) => {
    // TODO: add genre validation
    const genre = ctx.update.message.text;

    ctx.state.genre = genre;

    const year = '2010s';

    ctx.replyWithMarkdown(`loading some ${genre}...`);

    musicService.getAlbumsList(year, genre).then((albums) => {
        const itemMarkups = albums.map((item) => getAlbumsListItemMarkups(item));
        ctx.replyWithHTML(itemMarkups.join('\n\n')).then(() => {
            ctx.replyWithMarkdown('Would you like to subscribe for updates', Markup
                .keyboard([['Y', 'N']])
                .resize()
                .extra()
            ).then(() => {
                ctx.scene.enter(SUBSCRIPTION_SCENE);
            });
        });
    })
});

music.leave((ctx) => {
    delete ctx.state.genre;
});

function getAlbumsListItemMarkups(item) {
    return `<code>${item.author} - ${item.title}</code>\n<i>${item.date} | Rating: ${item.rating}</i>`;
}

// subscription scene
const subscription = new Scene(SUBSCRIPTION_SCENE);
subscription.enter((ctx) => ctx.reply('Hi'));
subscription.leave((ctx) => ctx.reply('Bye'));
subscription.hears(['Y', 'N'], (ctx) => {
    const id = ctx.chat.id;
    // TODO: add subscription
});

bot.command('help', (ctx) => ctx.replyWithMarkdown('Type any music genre for request'));

stage.register(music);
stage.register(subscription);

bot.use(session());

bot.use(stage.middleware());

bot.on('message', (ctx) => {
    console.log(ctx.state);
    if (ctx.state.genre) {
        ctx.scene.enter(SUBSCRIPTION_SCENE);
    } else {
        ctx.scene.enter(MUSIC_REQUEST_SCENE);
    }
});

module.exports = bot;