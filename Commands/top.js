const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {

    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name).setThumbnail(message.guild.iconURL({dynamic: true})).setColor("RANDOM").setTimestamp();
    let teyitData = rdb.get("reg") || {};
    let data = Object.keys(teyitData);
    let dataTop = data.filter(x => message.guild.members.cache.has(x)).sort((a, b) => Number((teyitData[b].erkek || 0) + (teyitData[b].kadin || 0)) - Number((teyitData[a].erkek) + (teyitData[a].kadin))).map((value, index) => `\`${index+1}.\` ${message.guild.members.cache.get(value)} adlı üyenin toplam **${(teyitData[value].erkek || 0) + (teyitData[value].kadin || 0)}** (\`${teyitData[value].erkek || 0}\` erkek, \`${teyitData[value].kadin || 0}\` kadın)`).splice(0, 30).join("\n");
    message.channel.send(embed.setDescription(`**Sıralama** \n\n ${dataTop || 'Sıralama için yeterli veri bulunamadı!'}`));
};

module.exports.configuration = {
    name: "top",
    aliases: ["top-teyit", "top30", "top-30"],
    usage: "top",
    description: "Sunucuda en çok teyit edenleri sıralar"
};
