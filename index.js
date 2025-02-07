const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

// Botni token bilan boshlash
const bot = new Telegraf('7792630380:AAFRjXIM2D9bwSsxULF-smf0oqFrZzkDrCo');
const CHANNEL_USERNAME = '@tarix_yozgani_keldik';  // Kanal nomi

// Foydalanuvchining kanalga obuna bo‘lganini tekshirish
async function checkSubscription(ctx) {
  try {
    const member = await ctx.telegram.getChatMember(CHANNEL_USERNAME, ctx.from.id);
    // Agar foydalanuvchi kanalga obuna bo‘lsa
    return member.status === 'member' || member.status === 'administrator' || member.status === 'creator';
    ctr.reply(member.status);
  } catch (error) {
    console.error('Obunani tekshirishda xato:', error);
    return false;
  }
}

setInterval(() => fetch('https://history-uz-backend.onrender.com/test'), 30000);

app.get('/',(req,res)=>{
  res.send('Server is live');
})

// /start komandasi yordamida foydalanuvchiga xabar yuborish
bot.start(async (ctx) => {
  const isSubscribed = await checkSubscription(ctx);
  if (isSubscribed) {
    ctx.reply(`Assalomu alaykum! Siz kanalga obuna bo‘ldingiz. Web ilovaga o‘tish uchun quyidagi tugmani bosing.`, {
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
  } else {
    ctx.reply('Siz kanalga obuna bo‘lishingiz kerak: @tarix_yozgani_keldik', {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'A\'zo bo\'lish',
            callback_data: 'subscribe'
          }]
        ]
      }
    });
  }
});

// Foydalanuvchi "A'zo bo'lish" tugmasini bosganda
bot.action('subscribe', async (ctx) => {
  const isSubscribed = await checkSubscription(ctx);
  if (isSubscribed) {
    ctx.reply('Siz kanalga obuna bo‘ldingiz! Endi Web ilovaga o‘tishingiz mumkin.', {
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
  } else {
    ctx.reply('Siz hali kanalga obuna bo‘lmadingiz. Iltimos, kanalga obuna bo‘ling va qaytadan urinishga harakat qiling.');
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: "Server is active" });
});

// Botni ishga tushurish
bot.launch({
  polling: {
    interval: 300,   // So'rovlar orasidagi interval
    timeout: 50,     // Kutilgan vaqt
    limit: 100,      // Maksimal soni
  }
});

app.listen(9000, () => console.log("Started bot"));
