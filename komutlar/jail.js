const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;

var jailrolu = "☭ JAIL"; 

module.exports.run = async (client, message, args) => {
 if(!message.member.roles.cache.has('774942890240507934')) return message.channel.send('**Bu komutu kullanabilmek için \`☭ JAIL AXE\` yetkisine sahip olmasınız.**')
  let jailkisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  if (!jailkisi)
    return message.reply(
      `:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; **${prefix}mute <@kullanıcı> <1s/1m/1h/1d/1w/1mo>**`
    );

  let sebep = args.splice(2, args.length).join(" ");
  let jailrol = message.guild.roles.cache.find(role => role.name == jailrolu);
  if (!jailrol) {
    try {
      jailrol = await message.guild.roles.create({
        name: jailrolu,
        color: "#313136",
        permissions: [],
        reason: 'Jail için!'
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.createOverwrite(jailrol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let jailzaman = args[1]
    .replace(`saniye`, `s`)
    .replace(`dakika`, `m`)
    .replace(`saat`, `h`)
    .replace(`gün`, `d`)
    .replace(`hafta`, `w`)
    .replace(`ay`, `mo`);

  if (!jailzaman) return message.reply(`:warning: Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}jail <@kullanıcı> <1s/1m/1h/1d/1w/1mo>\``);

  await jailkisi.roles.add(jailrol.id);
 const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle("Jail İşlemi Başarılı")
    .setDescription(`<@${jailkisi.id}> Adlı Kullanıcı \`${args[1]}\` Süreliğine \`${sebep}\` Sebebiyle Jaile Atıldı. Atan Yetkili ${message.author}`)
    .setFooter("Cezalandırıldı!", client.user.avatarURL())
 
    client.channels.cache.get('775063455400460288').send(embed)
  

  setTimeout(function() {
    jailkisi.roles.remove(jailrol.id);
    message.channel.send(`<@${jailkisi.id}> Adlı Kişinin Jail Süresi Sona Erdi`);
  }, ms(jailzaman));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "jail",
  description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar jail atar.",
  usage: "jail <@kullanıcı> <1sn/1dk/1sa/1g>"
};
