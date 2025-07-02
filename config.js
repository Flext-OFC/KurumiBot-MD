import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 525218138672

//*──ׄ✰─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner = [
  ['5491168758497', '🌸 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 🌹', true],
  ['', 'felix', true],
  ['', 'Félix México', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner_lid = [
  ['5491168758497', '🌸 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 🌹 (LID)', true],
  ['149963665342644', 'Félix (LID)', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['5215211111111'] 
global.prems = []

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.vs = '2.0.0'
global.languaje = 'Español'
global.nameqr = 'Makima - 2.0 - Bot'
global.sessions = 'Session'
global.jadi = 'JadiBot'
global.makiJadibts = true

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.packsticker = `♾━━━━━━━━♾\nBot: Kurumi 2.0\n\n|Creador: Flext Enzo♾━━━━━━━━♾\n`
global.packname = `🌸 Kurumi - Bot - MD 🌹`
global.author = `Stickers KurumiBot`;
global.wm = '🌸𝗞𝘂𝗿𝘂𝗺𝗶 - 𝗕𝗼𝘁 - 𝗠𝗗💖';
global.titulowm = '🌸𝐊𝐮𝐫𝐮𝐦𝐢𝐁𝐨𝐭-𝐌𝐃🌹';
global.igfg = '𝐅𝐥𝐞𝐱𝐭-𝐎𝐅𝐂'
global.botname = '💖Kurumi - bot - MD💫'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ Flext Enzo'
global.textbot = '𝑲𝒖𝒓𝒖𝒎𝒊𝑩𝒐𝒕 : Flext Enzo'
global.gt = '𝑲𝒖𝒓𝒖𝒎𝒊';
global.namechannel = '🌸𝗞𝘂𝗿𝘂𝗺𝗶 - 𝗕𝗼𝘁 - 𝗠𝗗 - 𝗖𝗵𝗮𝗻𝗻𝗲𝗹💥'

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.moneda = 'MakiCoins'

//• ↳ ◜𝑳𝑰𝑵𝑲𝑺  𝑫𝑬𝒀𝑴𝑶𝑶𝑵 𝑪𝑳𝑼𝑩◞ • 🩵
global.gp4 = 'https://chat.whatsapp.com/E867Fqb9zYJHlMJ2Rulckc?mode=r_c' //Grupo Oficial De Makima 
global.gp1 = 'https://chat.whatsapp.com/E867Fqb9zYJHlMJ2Rulckc?mode=r_c' //Grupo 2
global.gp2 = 'https://chat.whatsapp.com/E867Fqb9zYJHlMJ2Rulckc?mode=r_c'//
global.channel = 'https://whatsapp.com/channel/0029Vb4oRvuJuyALQAPcyu2O' //Canal Oficial
global.channel2 = 'https://whatsapp.com/channel/0029Vb4oRvuJuyALQAPcyu2O' //Canal test 
global.yt = 'https://www.youtube.com/flextOFC' //Canal De Youtube
global.md = 'https://github.com/FlextOFC/KurumiBot-MD' //Github Oficial
global.correo = 'Flextofc@gmail.com'
global.cn ='https://whatsapp.com/channel/0029Vb4oRvuJuyALQAPcyu2O';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363398249175961@newsletter',
}
global.multiplier = 70

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
