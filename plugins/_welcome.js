import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const channelRD = {
  id: "120363398249175961@newsletter", // Cambia por tu canal si quieres
  name: "🌸𝐊𝐔𝐑𝐔𝐌𝐈 - 𝐂𝐇𝐀𝐍𝐍𝐄𝐋"
};

export async function before(m, { conn, participants, groupMetadata }) {
  if (
    !m.messageStubType ||
    !m.isGroup ||
    !m.messageStubParameters?.[0] ||
    !global.db.data.chats[m.chat]?.welcome
  ) return !0

  const jid = m.messageStubParameters[0]
  const user = `@${jid.split('@')[0]}`
  const thumbnailUrl = 'https://files.catbox.moe/4jb3zb.jpg'
  const pp = await conn.profilePictureUrl(jid, 'image').catch(() => thumbnailUrl)
  const img = await fetch(pp).then(r => r.buffer())
  const total = [28, 32].includes(m.messageStubType)
    ? participants.length - 1
    : participants.length + 1

  // Contexto newsletter/canal
  const contextNewsletter = {
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1
    },
    externalAdReply: {
      title: channelRD.name,
      body: '🌹𝑲𝒖𝒓𝒖𝒎𝒊 𝑩𝒐𝒕 𝑴𝑫💖,
      thumbnailUrl: thumbnailUrl,
      mediaType: 1,
      renderLargerThumbnail: false,
      sourceUrl: `https://whatsapp.com/channel/${channelRD.id.replace('@newsletter', '')}`
    }
  };

  // Mensaje citado para bienvenida/despedida
  const quotedMsg = (txt) => ({
    key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: m.chat, id: Math.random().toString(36).slice(2) },
    message: { conversation: txt }
  });

  if (m.messageStubType == 27) {
    const bienvenida = `
🌸 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗢/@ 🌸

📌 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: ${user}
💥 𝗚𝗿𝘂𝗽𝗼: ${groupMetadata.subject}
✨ 𝗠𝗶𝗲𝗺𝗯𝗿𝗼𝘀: ${total}

⌬ Usa *#menu* para ver los comandos disponibles
`
    // Mensaje de bienvenida como newsletter
    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: bienvenida, 
      contextInfo: contextNewsletter 
    });
    // Mensaje adicional, respondiendo a 《✧》 LLEGO OTRO
    await conn.sendMessage(m.chat, { 
      text: '💫ɴᴜᴇᴠᴏ ᴍɪᴇᴍʙʀᴏ ᴅᴇʟ ɢʀᴜᴘᴏ💫', 
      contextInfo: contextNewsletter
    }, { quoted: quotedMsg('《✧》 𝑼𝒏 𝒏𝒖𝒆𝒗𝒐 𝒎𝒊𝒆𝒎𝒃𝒓𝒐 𝒍𝒍𝒆𝒈𝒐..') });
  }

  if ([28, 32].includes(m.messageStubType)) {
    const despedida = `
🌸 𝗕𝗬𝗘 - 𝗨𝗦𝗘𝗥 :v 🌸

📌 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: ${user}
💥 𝗚𝗿𝘂𝗽𝗼: ${groupMetadata.subject}
✨ 𝗠𝗶𝗲𝗺𝗯𝗿𝗼𝘀: ${total}

⌬ Espero y vuelvas después.
`
    // Mensaje de despedida como newsletter
    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: despedida, 
      contextInfo: contextNewsletter 
    });
    // Segundo mensaje, respondiendo a 《✧》 SE FUE
    await conn.sendMessage(m.chat, { 
      text: '𝑼𝑵 𝑼𝑺𝑼𝑨𝑹𝑰𝑶 𝑨𝑩𝑨𝑵𝑫𝑶𝑵𝑶 𝑬𝑳 𝑮𝑹𝑼𝑷𝑶', 
      contextInfo: contextNewsletter
    }, { quoted: quotedMsg('《✧》 𝑺𝒆 𝒏𝒐𝒔 𝒇𝒖𝒆 𝒖𝒏 𝒓𝒆𝒚') });
  }
}