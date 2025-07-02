import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) throw `*📌 Uso Correcto: ${usedPrefix + command} Kurumi*`;
conn.reply(m.chat, '💫 *+｡:.ﾟヽ(*´∀)ﾉﾟ𝓑𝓾𝓼𝓬𝓪𝓷𝓭𝓸 𝓼𝓾 𝓲𝓶𝓪𝓰𝓮𝓷.:｡+ﾟ...*', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
const res = await googleImage(text);
const image = await res.getRandom();
const link = image;
const messages = [['Imagen 1', dev, await res.getRandom(),
[[]], [[]], [[]], [[]]], ['Imagen 2', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 2', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 4', dev, await res.getRandom(), [[]], [[]], [[]], [[]]]]
await conn.sendCarousel(m.chat, `🌸 Resultados de: ${text}`, 'KURUMI - BOT - MD', null, messages, m);
};
handler.help = ['imagen <query>'];
handler.tags = ['buscador','descargas'];
handler.command = ['image','imagen'];
handler.group = true;
handler.register = true
export default handler;
