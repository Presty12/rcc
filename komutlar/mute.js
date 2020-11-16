const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;

var mutelirolu = "☭ CHAT MUTE"; 

module.exports.run = async (client, message, args) => {
 if(!message.member.roles.cache.has('774944432805117952')) return message.channel.send('**Bu komutu kullanabilmek için \`☭ MUTE AXE\` yetkisine sahip olmasınız.**')
  let mutekisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  if (!mutekisi)
    return message.reply(
      `:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; **${prefix}cmute <@kullanıcı> <1sn/1dk/1sa/1g>**`
    );

  let sebep = args.splice(2, args.length).join(" ");
  let muterol = message.guild.roles.cache.find(role => role.name == mutelirolu);
  if (!muterol) {
    try {
      muterol = await message.guild.roles.create({
        name: mutelirolu,
        color: "#313136",
        permissions: [],
        reason: 'Mute için!'
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.createOverwrite(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
    .replace(`sn`, `s`)
    .replace(`dk`, `m`)
    .replace(`sa`, `h`)
    .replace(`g`, `d`);

  if (!mutezaman) return message.reply(`:warning: Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}cmute <@kullanıcı> <1sn/1dk/1sa/1g>\``);

  await mutekisi.roles.add(muterol.id);
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle("Chat Mute İşlemi Başarılı")
    .setDescription(`<@${mutekisi.id}> Adlı Kullanıcıya \`${args[1]}\` Süreliğine \`${sebep}\` Sebebiyle Mute Atıldı. Mute Atan Yetkili ${message.author}`)
    .setFooter("NOXUS CHAT MUTE SYSTEM", client.user.avatarURL())
   client.channels.cache.get('775064390712950825').send(embed)
  

  setTimeout(function() {
    mutekisi.roles.remove(muterol.id);
    message.channel.send(`<@${mutekisi.id}> kullanıcısının mutelenme süresi sona erdi!`);
  }, ms(mutezaman));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tempmute"],
  permLevel: 0
};

exports.help = {
  name: "cmute",
  description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
  usage: "cmute <@kullanıcı> <1sn/1dk/1sa/1g>"
};
