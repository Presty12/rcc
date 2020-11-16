const Discord = require('discord.js');


exports.run = (client, message, args) => {

 if(!message.member.roles.cache.has('774942889583181874')) return message.channel.send('**Bu komutu kullanabilmek için \`☭ BAN AXE\` yetkisine sahip olmasınız.**')
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Lütfen bir kullanıcı belirtin');

        if(!member) return message.channel.send('Bu Kullanıcıyı Bulamıyorum');

        if(member.id === message.author.id) return message.channel.send('Kendini Banlayamazsın!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Belirtilmemiş';

        member.ban({reason:`${reason}`})
        .catch(err => {
            if(err) return message.channel.send('Bir şeyler yanlış gitti')
        })

        const banembed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Ban İşlemi Başarılı')
        .setDescription(`${member} Adlı Kullanıcı \`${reason}\` Sebebi İle Banlandı. Kullanıcıyı Banlayan Yetkili ${message.author}.`)
        .setFooter('Çık Git Burdan Demasyalı', client.user.avatarURL())
      client.channels.cache.get('775063188206125119').send(banembed)


    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ban'],
    permLevel: 0
};

exports.help = {
    name: 'ban',
    description: 'Ban ',
    usage: 'ban'
};