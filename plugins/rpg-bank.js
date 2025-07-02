// Codigo Creado por felix2-bup 
import fetch from 'node-fetch'
import db from '../lib/database.js'

const img = 'https://qu.ax/dXOUo.jpg'

// Canal info (personaliza aquí)
const canalName = '𝗘𝗖𝗢𝗡𝗢𝗠𝗜𝗔 𝗗𝗘𝗟 𝗨𝗦𝗨𝗔𝗥𝗜𝗢'
const canalDesc = '𝑲𝑼𝑹𝑼𝑴𝑰 - 𝑩𝑶𝑻 - 𝑴𝑫 𝑪𝑯𝑨𝑵𝑵𝑬𝑳'
const canalUrl = 'https://whatsapp.com/channel/120363398249175961'
const dev = 'Flext Enzo'

function obtenerRango(level) {
  if (level >= 100) return 'SUPREMO'
  if (level >= 70) return '👑 REY DEL CAMINO'
  if (level >= 50) return '⚔️ JEFE DE GUARDIA'
  if (level >= 40) return '♥️ASTENADOR'
  if (level >= 30) return '🥇 Caballero Dorado'
  if (level >= 20) return '🥈 Caballero de Plata'
  if (level >= 10) return '🥉 Caballero de Bronce'
  if (level >= 5) return '🌱 Novato'
  return '♥️ Aprendiz del camino'
}

let handler = async (m, { conn }) => {
  let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender

  if (who === conn.user.jid) return m.react('✖️')

  if (!global.db.data.users[who]) {
    return m.reply(`🌹 *Este usuario no está registrado.*`)
  }

  let user = global.db.data.users[who]
  let name = await conn.getName(who)
  let rangoMagico = obtenerRango(user.level)

  let nombreParaMostrar = who === m.sender ? name : '@' + who.split('@')[0]

  let txt = `
╭━━━━━━━━━━━━━━━━━╮
┃𝗘𝗖𝗢𝗡𝗢𝗠𝗜𝗔 𝗗𝗘𝗟 𝗨𝗦𝗨𝗔𝗥𝗜𝗢: 
╰━─━─━─≪≪✠≫≫─━─━─━╯
📌𝖭𝗈𝗆𝖻𝗋𝖾: ${nombreParaMostrar}
💫𝖤𝗑𝗉: ${user.exp}
✨𝖭𝗂𝗏𝖾𝗅: ${user.level}
💥𝖱𝖺𝗇𝗀𝗈: ${rangoMagico}
🌸𝖥𝖾𝖼𝗁𝖺: ${new Date().toLocaleString('es-ES')}
╰━━━━━━━━━━━━━━━━━━
> © Desarrollado por Félix 
╰━━━━━━━━━━━━━━━━━━`.trim()

  // MENSAJE CON CONTEXTO DE CANAL/NEWSLETTER (igual que el menú)
  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: txt,
    mentions: [who],
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363398249175961@newsletter", // ID de tu canal
        newsletterName: canalName,
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: canalName,
        body: canalDesc,
        thumbnailUrl: img,
        sourceUrl: canalUrl,
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    }
  }, { quoted: m })
}

handler.help = ['bank', 'banco']
handler.tags = ['rpg']
handler.command = ['bank', 'bal']
handler.register = true

export default handler