const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {

    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setFooter("AETHER")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let data = kdb.get(`isimler.${member.id}`);
    let listedData = data.length > 0 ? data.map((value, index) => `\`${index + 1}.\` ${value.guildName} ismiyle \`${new Date(value.Zaman).toTurkishFormatDate()}\` tarihinde ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : "Bulunamadı."} tarafından **${value.Komut}** olarak kaydedildi.`) : "Bu Üyenin İsim Geçmişi Bulunamadı.";
    message.channel.send(embed.setDescription(`${listedData.join("\n")}`));

    
};

module.exports.configuration = {
    name: "isimler",
    aliases: ["isimler"],
    usage: "isimler / isimler @üye",
    description: "Belirtilen üyenin geçmiş isimlerine bakarsınız."
};
