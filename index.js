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
    if (member.status === 'member' || member.status === 'administrator') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Obunani tekshirishda xato:', error);
    return false;
  }
}

// /start komandasi yordamida foydalanuvchiga xabar yuborish
bot.start(async (ctx) => {
  // Foydalanuvchi kanalga obuna bo‘lganligini tekshiramiz
  const isSubscribed = await checkSubscription(ctx);

  if (isSubscribed) {
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
  } else {
    ctx.reply('Siz kanalga obuna bo‘lishingiz kerak: @tarix_yozgani_keldik');
  }
});

app.get('/', (req,res)=>{
    res.status(200).json({message:"Server is active"});
});

// Botni ishga tushurish
bot.launch();
app.listen(9000, ()=>console.log("Started bot"));
