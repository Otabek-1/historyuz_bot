const { Telegraf } = require('telegraf');
// Botni token bilan boshlash
const bot = new Telegraf('7792630380:AAFRjXIM2D9bwSsxULF-smf0oqFrZzkDrCo');
// /start komandasi yordamida foydalanuvchiga xabar yuborish
bot.start((ctx) => {
    ctx.reply('Assalomu alaykum! Web ilovaga o‘tish uchun quyidagi tugmani bosing.', {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'Web Ilovaga O‘tish',
            web_app: {
              url: 'https://historyuz.netlify.app/'  // Telegram ichida ochiladigan web app URL
            }
          }]
        ]
      }
    });
  });
// Botni ishga tushurish
bot.launch();
