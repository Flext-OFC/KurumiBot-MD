const handler = async (m, { conn }) => {
  const texto = `
 _*REPO DE LA BOT*_ 

\`\`\`Repositorio OFC:\`\`\`
https://github.com/flextOFC/KurumiBot-MD

> 🌟 Deja tu estrella así nos motivas a seguir mejorando la bot.

🩵 *Grupo oficial de la bot:* https://chat.whatsapp.com/E867Fqb9zYJHlMJ2Rulckc?mode=r_c
  `.trim()

  await conn.reply(m.chat, texto, m)
}

handler.help = ['script']
handler.tags = ['info']
handler.command = ['script']

export default handler
