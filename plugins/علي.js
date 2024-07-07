import axios  from 'axios';

let handler = async (m, { conn, text }) => {
 conn.akira = conn.akira ? conn.akira : {};

 if (!text) throw `*للتحدث مباشرة مع البوت وبدون أوامر نكتب*\n\n.تفعيل تفعيل \n\n*بالنسبة إذا أردت إلغاء وضع البوت الآلي والرجوع للبوت بشكله الطبيعي فعليك كتابة هكذا*\n\n*.تفعيل ايقاف* `;

 if (text == "تفعيل") {
 conn.akira[m.chat] = {
 pesan: []
 }
 m.reply("🟢 *تم تفعيل وضع الرد الالي إسأل أي سؤال*")
 } else if (text == "ايقاف") {
 delete conn.akira[m.chat]
 m.reply("🔴 *تم ايقاف وضع الرد الآلي اكتب اوامر. لتنبتق لك جميع الأوامر*")
 }
}

handler.before = async (m, { conn }) => {
conn.akira = conn.akira ? conn.akira : {};
 if (m.isBaileys && m.fromMe) return;
 if (!m.text) return
 if (!conn.akira[m.chat]) return;

 if (
 m.text.startsWith(".") ||
 m.text.startsWith("#") ||
 m.text.startsWith("!") ||
 m.text.startsWith("/") ||
 m.text.startsWith("\\/")
 ) return

 if (conn.akira[m.chat] && m.text) {
 let name = conn.getName(m.sender)
 await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
 const messages = [
 ...conn.akira[m.chat].pesan,
 { role: "system", content: `اسمك إيلي، 20 عاما ، أنت المساعد الذكي الذي يمكنه الإجابة على جميع الأسئلة ، واستخدام اللغة العربيه باللهجة اليمنية عند الإجابة ، واستخدام الرموز التعبيرية عندما تريد الإجابة على الأسئلة ، ولديك طبيعة خالية من الهموم ولكنها أنثوية مثل المرأة ، ولديك صديق اسمه علي، علي هو الشخص الذي قام بإضافتي الى واتساب كصديق لمساعدتك، إذا كان لديك أي أسئلة تتعلق بالترميز الذي أجبت عليه بالرفض ،  اسم المحاور الخاص بك هو *${name}*"` },
 { role: "user", content: m.text }
 ];
 try {
 const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
 messages
 });

 const responseData = response.data;
 const hasil = responseData;
 await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
 m.reply(hasil.answer)
 conn.akira[m.chat].pesan = messages
 } catch (error) {
 console.error("Error fetching data:", error);
 throw error;
 }
 }
}

handler.command = ['تفعيل'];
handler.tags = ["ai"]
handler.help = ['bobiza']
export default handler
