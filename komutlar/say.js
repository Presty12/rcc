const Discord = require('discord.js');

exports.run = async (client, message, args) => {

var tagdakiler = 0;
  let tag = "Kobs";
message.guild.members.cache.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler+1
    }
  })    
const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0
     let botlar = message.guild.members.cache.filter(m => m.user.bot).size;
    let textChannels = message.guild.channels.cache.filter(m => m.type == "text").size;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  let  çevrimiçi = message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size
    const nox  = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField(` **Toplam Noxus'a Gelenler** **${message.guild.memberCount}**`)
        .addField(` **Toplam Çevrimiçi Noxuslu Sayısı** **${çevrimiçi}**`) 
        .addField(`**Seslideki Noxuslu Sayısı** **${count}**`)
        .addField(`**Noxian Sayısı** **${tagdakiler}**`)
    message.channel.send(nox);

} 

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
    usage: 'say'
}