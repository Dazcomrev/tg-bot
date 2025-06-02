const TelegramBot = require("node-telegram-bot-api");

const token = "7230369845:AAHXDkOdsFCSi2RsRMp8VzCFZo9gLhvUups";
const webAppUrl = 'https://aesthetic-creponne-ffd0c8.netlify.app';
const bot = new TelegramBot(token, { polling: true });
    
bot.setMyCommands([
    { command: '/start', description: 'Приветствие и запуск Web App.' },
    { command: '/help', description: 'Краткая инструкция по использованию бота и Web App.' },
])


bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    try {
        if (text === '/start') {

            await bot.sendMessage(chatId, 'Приветствую вас, для того, чтобы посмотреть информацию о киберспортивных командах и игроках вуза нажмите на кнопку ниже.', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Информация о киберспортивных командах', web_app: { url: webAppUrl + '/ListTeams' } }]
                    ]
                }
            });
        }
        else if (text === '/help') {
            await bot.sendMessage(chatId, `Для того, чтобы запустить Web App придожение нажмите /start.\nВойдя в приложение вы попадете на страницу со списком команд. Выберите команду и нажмите на нее, чтобы посмотреть карточку этой команды. В карточке команды можно выбрать игрока команды (из состава команды) и нажать на него, чтобы просмотреть его карточку игрока.`);
        }
        else {
            await bot.sendMessage(chatId, `Я не знаю команды "${text}". Нажмите /help, чтобы узнать команды для бота.`);
        }

        if (msg?.web_app_data?.data) {
            const data = JSON.parse(msg?.web_app_data?.data);

            await bot.sendMessage(chatId, data);
        }
    } catch (e) {
        await bot.sendMessage(chatId, 'Беда, беда. Произошла какая то ошибочка!)');
        console.log("Ошибка: ", e);
    }
});