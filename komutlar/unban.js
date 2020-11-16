const Discord = require('discord.js');
const fs = require('fs');
  const db = require('quick.db');

exports.run = async (client, message, args) => {
  
    
 if(!message.member.roles.cache.has('775063188206125119')) return message.channel.send('**Bu komutu kullanabilmek için \`☭ BAN AXE\` yetkisine sahip olmasınız.**')
  

  let user = args[0];
 if (isNaN(user)) return message.channel.send('**Lütfen Banını Açmak İstediğiniz Üyeninin ID sini Girin**');
  
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle('Ban Kaldırma İşlemi Başarılı')
  .setDescription(`<@${user}> Adlı Kullanıcının Banı ${message.author} Tarafından Kaldırıldı`)
  .setFooter("Bu Sefer Gir Bakalım")
  client.channels.cache.get('775063188206125119').send(embed)
  message.guild.members.unban(user);
  

  
  const embed2 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`Belirtiğiniz İD'nin Banı Açıldı`)
  message.channel.send(embed2)

  
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unban','ban-kaldır'],
    permLevel: 0
};

exports.help = {
    name: 'unban',
    description: 'unban',
    usage: 'unban'
};
