let handler = async function (m, { conn }) {
  let user = global.db.data.users[m.sender]
  
  if (!user.registered) {
    return m.reply(`
💥 *ERROR*
`)
  }

  user.registered = false
  m.reply(`
「📌」 *𝑹𝒆𝒈𝒊𝒔𝒕𝒓𝒐 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒅𝒐.*

《✧》𝐘𝐚 𝐧𝐨 𝐩𝐨𝐝𝐫𝐚𝐬 𝐮𝐬𝐚𝐫 𝐦𝐢𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬.
`)

  // Datos del canal/newsletter (para el efecto de reenviado)
  const channelRD = { id: "120363398249175961@newsletter", name: "AVISO DE MI CREADOR" }
  
  // El mensaje que TÚ quieras (puedes cambiarlo)
  let mensaje = "「🚨」Debido a que eliminaste tu registro en la bot, ya no podrás usar la mayoría de sus funciones."

  // Envía el mensaje simulado como reenviado desde el canal
  await conn.sendMessage(m.chat, {
    text: mensaje,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.name,
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: channelRD.name,
        body: '💫𝐊𝐔𝐑𝐔𝐌𝐈𝐁𝐎𝐓 - 𝐅𝐑𝐀𝐒𝐄𝐒🌹',
        thumbnailUrl: 'https://files.catbox.moe/o2s23u.jpg', // Opcional, cámbiala si quieres
        mediaType: 1,
        renderLargerThumbnail: true,
      }
    }
  }, { quoted: m })
}

handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['unreg']
handler.register = true

export default handler