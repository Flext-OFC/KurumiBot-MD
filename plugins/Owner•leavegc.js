let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
let chat = global.db.data.chats[m.chat]
chat.welcome = false
await conn.reply(id, `「✨」𝗞𝗨𝗥𝗨𝗠𝗜 - 𝗕𝗢𝗧 - 𝗠𝗗 𝗔𝗕𝗔𝗡𝗗𝗢𝗡𝗔 𝗘𝗟 𝗚𝗥𝗨𝗣𝗢....`) 
await conn.groupLeave(id)
try {  
chat.welcome = true
} catch (e) {
await m.reply(`${fg}`) 
return console.log(e)
}}
handler.command = ['leave', 'leavegc', 'salir']
handler.group = true
handler.rowner = true
export default handler