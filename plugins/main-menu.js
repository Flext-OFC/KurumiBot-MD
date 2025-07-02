//* Código creado por Félix, no quites créditos *//

import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
import { promises } from 'fs';
import { join } from 'path';

// Creamos un objeto global para almacenar el banner y el nombre por sesión
global.bannerUrls = {}; // Almacenará las URLs de los banners por sesión
global.botNames = {};   // Almacenará los nombres personalizados por sesión

let handler = async (m, { conn, usedPrefix, text, command }) => {
  try {
    // Inicializamos el banner y el nombre por sesión si no existen
    if (!global.bannerUrls[conn.user.jid]) {
      global.bannerUrls[conn.user.jid] = 'https://files.catbox.moe/5k9zhl.jpg'; // URL inicial de la imagen del menú
    }
    if (!global.botNames[conn.user.jid]) {
      global.botNames[conn.user.jid] = 'Bot'; // Nombre inicial del bot
    }

    // Verificar si el usuario es el socket activo
    const isSocketActive = conn.user.jid === m.sender;

    // Comando para cambiar el banner (solo permitido para el socket activo)
    if (command === 'setbanner') {
      if (!isSocketActive) {
        return await m.reply('「🩵」Este comando solo puede ser usado por el socket.', m);
      }
      if (!text) {
        return await m.reply('✘ Por favor, proporciona un enlace válido para la nueva imagen del banner.', m);
      }
      global.bannerUrls[conn.user.jid] = text.trim(); // Actualiza el banner solo para esta sesión
      return await m.reply('「🩵」El banner fue actualizado con éxito...', m);
    }

    // Comando para cambiar el nombre del bot (solo permitido para el socket activo)
    if (command === 'setname') {
      if (!isSocketActive) {
        return await m.reply('「🩵」Este comando solo puede ser usado por el socket.', m);
      }
      if (!text) {
        return await m.reply('「🩵」¿Qué nombre deseas agregar al socket?', m);
      }
      global.botNames[conn.user.jid] = text.trim(); // Actualiza el nombre solo para esta sesión
      return await m.reply('「🩵」El nombre fue actualizado con éxito...', m);
    }

    // Comandos para el menú y "CARGANDO COMANDOS" (pueden ser usados por cualquier usuario)
    if (command === 'menu' || command === 'help' || command === 'menú') {
      // Variables para el contexto del canal
      const dev = 'Félix Manuel';
      const redes = 'https://github.com/Andresv27728/2.0';
      const channelRD = { id: "120363398249175961@newsletter", name: "MAKIMA - FRASES" };
      let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/t1mq2n.jpg');

      // Mensaje de "CARGANDO COMANDOS..." con contexto de canal y respondiendo al mensaje
      await conn.sendMessage(m.chat, {
        text: '⫷ 𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬.... ⫸',
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            newsletterName: channelRD.name,
            serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
            title: 'Animación de carga',
            body: dev,
            thumbnailUrl: perfil,
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        }
      }, { quoted: m });

      // Datos usuario y menú
      let { exp, chocolates, level, role } = global.db.data.users[m.sender];
      let { min, xp, max } = xpRange(level, global.multiplier);
      let nombre = await conn.getName(m.sender);
      let _uptime = process.uptime() * 1000;
      let _muptime;
      if (process.send) {
        process.send('uptime');
        _muptime = await new Promise(resolve => {
          process.once('message', resolve);
          setTimeout(resolve, 1000);
        }) * 1000;
      }
      let muptime = clockString(_muptime);
      let uptime = clockString(_uptime);
      let totalreg = Object.keys(global.db.data.users).length;
      let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
      const emojis = '🩵';
      const error = '❌';

      let botname = global.botNames[conn.user.jid]; // Nombre del bot específico para esta sesión
      let menu = `¡Hola! ${taguser} soy ${botname} ${(conn.user.jid == global.conn.user.jid ? '(OficialBot)' : '(Sub-Bot)')} 

╭━━ɪ ɴ ғ ᴏ ʙ ᴏ ᴛ━━
┃Creador: 𝑭𝑳𝑬𝑿𝑻-𝑶𝑭𝑪
┃Tiempo activo: ${uptime}
┃Baileys: Multi device.
┃Base: Oficial.
┃Registros: ${totalreg}
╰♡*:.｡.━━━━━━.｡.:*♡

╭━━𝗜𝗡𝗙𝗢 𝗨𝗦𝗨𝗔𝗥𝗜𝗢━╮
┃Nombre: ${nombre}
┃Rango: ${role}
┃Nivel: ${level}
╰♡*:.｡.━━━━━━.｡.:*♡

➪ 𝑳𝑰𝑺𝑻 
       ➪  𝑫𝑬 
           ➪ 𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑺

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝚙𝚛𝚒𝚗𝚌𝚒𝚙𝚊𝚕𝚎𝚜
┃┈❥ #estado
┃┈❥ #botreglas
┃┈❥ #menu
┃┈❥ #menu2
┃┈❥ #uptime
┃┈❥ #menulista
╰♡*:.｡.━━━━━━.｡.:*♡

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝚗𝚞𝚎𝚟𝚘𝚜
┃┈❥ #artista [nombre]
┃┈❥ #dalle2
┃┈❥ #repeat
┃┈❥ #repite
┃┈❥ #copiame
┃┈❥ #soccer
┃┈❥ #rcjugador
┃┈❥ #rgjugador
┃┈❥ #vtjugador
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝚙𝚎𝚛𝚜𝚘𝚗𝚊𝚕𝚒𝚣𝚊𝚌𝚒𝚘𝚗
┃┈❥ #set
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝚂𝚄𝙱𝙱𝙾𝚃𝚂
┃┈❥ #setname
┃┈❥ #setbanner
┃┈❥ #code 
┃┈❥ #qr
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙱𝚄𝚂𝙲𝙰𝙳𝙾𝚁𝙴𝚂
┃┈❥ #gitthubsearch
┃┈❥ #google [Búsqueda]
┃┈❥ #tiktoksearch
┃┈❥ #pinterest
┃┈❥ #imagen [querry]
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙹𝚄𝙴𝙶𝙾𝚂
┃┈❥ #abrazar
┃┈❥ #acertijo
┃┈❥ #agarrar
┃┈❥ #ahorcado
┃┈❥ #besar
┃┈❥ #acariciar
┃┈❥ #golpear
┃┈❥ #pregunta
┃┈❥ #reto
┃┈❥ #triste
┃┈❥ #reto
┃┈❥ #bot
┃┈❥ #love
┃┈❥ #consejo
┃┈❥ #dance
┃┈❥ #nombreninja
┃┈❥ #meme
┃┈❥ #dormir 
┃┈❥ #rata
┃┈❥ #enamorada
┃┈❥ #gay
┃┈❥ #manco
┃┈❥ #apostar
┃┈❥ #piropo
┃┈❥ #sonrojarse
┃┈❥ #agarrar
╰──────────────


.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝚆𝙰𝙸𝙵𝚄
┃┈❥ #robarpersonaje
┃┈❥ #obtenidos
┃┈❥ #sacar
┃┈❥ #guardar
┃┈❥ #carrw
┃┈❥ #confirmar
┃┈❥ #character
┃┈❥ #roll
┃┈❥ #top
╰──────────────


.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙾𝚂
┃┈❥ #reg
┃┈❥ #unreg
┃┈❥ #profile
┃┈❥ #usuarios
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙴𝙲𝙾𝙽𝙾𝙼𝙸𝙰
┃┈❥ #daily
┃┈❥ #bank
┃┈❥ #robar
┃┈❥ #robarxp
┃┈❥ #rob2
┃┈❥ #levelup
┃┈❥ #lb
┃┈❥ #mine
┃┈❥ #retirar
┃┈❥ #trabajar
┃┈❥ #transferir
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚂
┃┈❥ #fb
┃┈❥ #play
┃┈❥ #playvid
┃┈❥ #mediafire
┃┈❥ #apkmod
┃┈❥ #ytmp3doc
┃┈❥ #ytmp4doc
┃┈❥ #ig
┃┈❥ #gitclone
┃┈❥ #tiktok
┃┈❥ #spotify
┃┈❥ #tw
┃┈❥ #ytmp4 
┃┈❥ #imagen [querry]
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙶𝚁𝚄𝙿𝙾𝚂
┃┈❥ #group abrir 
┃┈❥ #group cerrar 
┃┈❥ #delete
┃┈❥ #setppgroup
┃┈❥ #encuesta
┃┈❥ #rentar
┃┈❥ #kick
┃┈❥ #promote
┃┈❥ #demote
┃┈❥ #tagall 
┃┈❥ #tag
┃┈❥ #invite 
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝚂𝚃𝙸𝙲𝙺𝙴𝚁𝚂
┃┈❥ #wm [autor]
┃┈❥ #s
┃┈❥ #qc
┃┈❥ #toimg
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙳𝙰𝚃𝙰𝙱𝙰𝚂𝙴
┃┈❥ #delvn
┃┈❥ #demsg
┃┈❥ #delimg
┃┈❥ #delsticker
┃┈❥ #infobot
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙴𝚇𝙿𝙴𝚁𝙸𝙴𝙽𝙲𝙸𝙰
┃┈❥ #buy
┃┈❥ #buyall
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙲𝙾𝙽𝙵𝙸𝙶𝚄𝚁𝙰𝙲𝙸𝚘𝙽
┃┈❥ #enable
┃┈❥ #disable
┃┈❥ #on
┃┈❥ #off
╰♡*:.｡.━━━━━━.｡.:*♡

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙰𝙽𝙸𝙼𝙴
┃┈❥ #toanime
┃┈❥ #tts
┃┈❥ #remini
┃┈❥ #enhance
┃┈❥ #hd
┃┈❥ #nuevafotochannel
┃┈❥ #nosilenciarcanal
┃┈❥ #silenciarcanal
┃┈❥ #seguircanal
┃┈❥ #inspect
┃┈❥ #infobot
┃┈❥ #readvo
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝙲𝙸𝚘𝙽
┃┈❥ #creador
┃┈❥ #owner
┃┈❥ #reportar
┃┈❥ #ping
┃┈❥ #links
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙲𝚁𝙴𝙰𝙳𝙾𝚁
┃┈❥ #addprem
┃┈❥ #copia
┃┈❥ #broadcastgroup
┃┈❥ #bcgb
┃┈❥ #bcgb2
┃┈❥ #broadcast
┃┈❥ #bc
┃┈❥ #cheat
┃┈❥ #delprem
┃┈❥ #dsowner
┃┈❥ #fixmsgespera
┃┈❥ #get
┃┈❥ #prefix
┃┈❥ #reiniciar 
┃┈❥ #saveplugin 
┃┈❥ #update
┃┈❥ #resetpersonajes
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙳𝙴𝚂𝙰𝚁𝚁𝙾𝙻𝙻𝙰𝙳𝙾𝚁𝙴𝚂
┃┈❥ #autoadmin
┃┈❥ #banuser
┃┈❥ #unbanuser
┃┈❥ #banchat
┃┈❥ #unbanchat
┃┈❥ #ip
┃┈❥ #join
╰──────────────

.       •| ⊱✿⊰ |• ㅤ
 •| ⊱✿⊰ |•𝙰 - 𝙸
┃┈❥ #dalle
┃┈❥ #simi
┃┈❥ #ai
┃┈❥ #tovideo
┃┈❥ #togifaud
╰──────────────


> © ⍴᥆ᥕᥱrᥱძ ᑲᥡ Félix Manuel`.trim(); // El resto del menú permanece igual

      // Enviar el menú con el banner y nombre específico para esta sesión y respondiendo al mensaje
      await conn.sendMessage(m.chat, {
        image: { url: global.bannerUrls[conn.user.jid] },
        caption: menu,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            newsletterName: channelRD.name,
            serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
            title: '💖𝐊𝐔𝐑𝐔𝐌𝐈-𝐁𝐎𝐓-𝐌𝐃🌹',
            body: dev,
            thumbnailUrl: perfil,
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        }
      }, { quoted: m });

      await m.react(emojis);
    }

  } catch (e) {
    await m.reply(`✘ Ocurrió un error cuando la lista de comandos se iba a enviar.\n\n${e}`, m);
    await m.react(error);
  }
};

handler.help = ['menu', 'setbanner', 'setname'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú', 'asistenciabot', 'comandosbot', 'listadecomandos', 'menucompleto', 'setbanner', 'setname'];
handler.register = true;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

export default handler;