require("express")().listen(1343);

const db = require("quick.db"); 
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("NzkwODQ1MDM3MzMyMDA0OTE0.X-Gh1g.rq8zFvC4asOoBlqGi-_-Vl0wBjA");
const fetch = require("node-fetch");
const fs = require('fs')

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return 
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Başarıyla Pinglendi.")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`a!yardım | Türkiyenin En İyi Uptime Botu! Sponrsor Aranıyor #BETA !!!`)
  console.log(`Logined`)
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "a!uptime") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("**⛔ Zaten Eklenmiş !!!**")
    
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("**✅ Başarılı Bir Şekilde 7/24 Yapıldı !!!**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
     message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("⛔ **Error Yalnızca Mutlak URL'ler Desteklenir.**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
   return message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "a!botsay") {
  var link = spl[1]
 message.channel.send(`**${db.get("linkler").length} / 1000**`)
}})



const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "a!yardım") {
let embed = new Discord.RichEmbed()
.setColor('#070706')
.addField(`Discord Uptime Bot Yardım Sistemi`, `Discord Botlarınız Benim Sayemde 7/24 Aktif Tutar`)
.setDescription(`**Komutlar**

 🌙 **a!yardım**  | Discord Uptime Botunun Yardım Sistemini Gösterir  (Burası)

 🔋 **a!uptime**  | Botunuzu 7/24 Aktif Tutmak İçin Kullanılan Komut

 ⚡ **a!botsay** | Sistemde Kaç Bot Olduğuna Bakar

`)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`Uptime Bot | Kodlayan NightLovel- , Editleyen ʰᶻ Marcus нαzяєтℓєяι.`, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})

  const log = message => {
  console.log(`${message}`);
}
  
  