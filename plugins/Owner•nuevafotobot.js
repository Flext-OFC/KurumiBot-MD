import axios from 'axios';

const handler = async (m, { conn }) => {
  try {
    const res = await axios.get('https://g-mini-ia.vercel.app/api/meme');
    const memeUrl = res.data.url;

    if (!memeUrl) {
      return m.reply('❌ No se pudo obtener el meme.');
    }

    await conn.sendMessage('120363398249175961@newsletter', {
      image: { url: memeUrl },
      caption: '「🌸」 *𝙼𝙴𝙼𝙴 𝙿𝙰𝚁𝙰 𝚃𝙸*\n\n> 💖𝗞𝘂𝗿𝘂𝗺𝗶 𝗕𝗼𝘁 𝗠𝗗💫',
    });

    m.reply('「🩵」 Meme enviado al canal con éxito...');
  } catch (e) {
    console.error(e);
    m.reply('「🩵」No pude enviar el meme porque no soy admin del canal.');
  }
};

handler.command = ['memechannel'];
handler.help = ['tools'];
handler.tags = ['owner'];

export default handler;