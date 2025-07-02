import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `💖 Ingresa un nombre o texto para buscar en YouTube.\n\n📌 *Ejemplo:* ${usedPrefix + command} Haikyuu AMV`;
  }

  try {
    await m.react('🕒'); // Reacción de búsqueda

    const search = await yts(text);
    const videoInfo = search.all?.[0];

    if (!videoInfo) {
      throw '❌ No se encontraron resultados. Intenta con otro título.';
    }

    const body = `*┏♡･ﾟ:*｡.:*･ﾟﾟ･*:.｡*:ﾟ･♡⬣*
*┃ 💖 ★彡[ᴋᴜʀᴜᴍɪʙᴏᴛ - ᴍᴅ]彡★ 💖*
*┗♡･ﾟ:*｡.:*･ﾟﾟ･*:.｡*:ﾟ･♡⬣*

🌸 *🅃🄸🅃🅄🄻🄾:* 
» ${videoInfo.title}

✨ *🄲🄰🄽🄰🄻:* 
» ${videoInfo.author.name}

⏳ *🄳🅄🅁🄰🄲🄸🄾🄽:* 
» ${videoInfo.timestamp}

💖 *🄿🅄🄱🄻🄸🄲🄰🄳🄾:* 
» ${videoInfo.ago}

📌 *🅅🄸🅂🅃🄰🅂:* 
» ${videoInfo.views.toLocaleString()} 

> 💎 *Selecciona una opción para descargar:*`;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: videoInfo.thumbnail },
        caption: body,
        footer: '🌸 𝑲𝑼𝑹𝑼𝑴𝑰 ✨| 𝑷𝑳𝑨𝒀',
        buttons: [
          { buttonId: `.ytmp3 ${videoInfo.url}`, buttonText: { displayText: '𝚊𝚞𝚍𝚒𝚘' } },
          { buttonId: `.play2 ${videoInfo.url}`, buttonText: { displayText: '𝚟𝚒́𝚍𝚎𝚘' } },
        ],
        viewOnce: true,
        headerType: 4,
      },
      { quoted: m }
    );

    await m.react('✅'); // Reacción de éxito
  } catch (e) {
    await m.reply(`❌ *Error:* ${e.message}`);
    await m.react('✖️');
  }
};

handler.command = ['play', 'playvid'];
handler.tags = ['downloader'];
handler.group = true;
handler.limit = 6;

export default handler;
