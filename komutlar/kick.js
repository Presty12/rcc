const Discord = require('discord.js');

exports.run = (client, message, args) => {


 if(!message.member.roles.cache.has('775062327044472832')) return message.channel.send('**Bu komutu kullanabilmek için \`☭ KICK AXE\` yetkisine sahip olmasınız.**')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Lütfen bir kullanıcı belirtin!');

        if(!member) return message.channel.send('Bu kullanıcıyı bulunamıyor!');

        if(member.id === message.author.id) return message.channel.send('Kendini Kickleyemezsin!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Belirtilmemiş' ;

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('Bir şeyler yanlış gitti')
        })

        const kickembed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Kick İşlemi Başarılı')
        .setDescription(`${member} Adlı Kullanıcıya \`${reason}\` Sebebi İle Kick Atıldı. Atan Yetkili ${message.author}`)
        .setFooter("Çık Git Buradan Demasyalı", client.user.avatarURL())
        client.channels.cache.get('775063602532974623').send(kickembed)


    }
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kick'],
    permLevel: 0
};

exports.help = {
    name: 'kick',
    description: 'kick ',
    usage: 'kick'
};