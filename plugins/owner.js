import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
*「 معلومات عن صاحب البوت 」*

*Number :*\nwa.me/966578700193
*instagram:*\ninstagram.com/ali_quteenah

*youtube:*\nyoutube.com/@quteenah

*facebook page:*\nwww.facebook.com/quteenah


`.trim()
  m.reply(caption)
}
handler.help = ['owner']
handler.tags = ['infobot']
handler.command = /^(owner)$/i
handler.limit = false

export default handler
