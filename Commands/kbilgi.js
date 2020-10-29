const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../settings.json");
const moment = require("moment");
module.exports.execute = async (client, message, args) => {

    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter("AETHER");
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let data = rdb.get(`reg.${member.id}`);

    let e = data.erkek || 0;
    let k = data.kadin || 0;
    let total = e+k;
    let kayitBilgi = `Toplam **${total}** kişi kaydetmiş; **${e}** erkek, **${k}** kadın.`

    message.channel.send(embed.setDescription(`
    __**Kullanıcı Bilgisi;**__
    
    \`Kullanıcı Adı:\` **${member.user.tag}**
    \`ID:\` **${member.id}**
    \`Oluşturulma Tarihi:\` **${moment(member.user.createdAt).format("DD/MM/YY HH:mm:ss")}**

    __**Sunucu İçi Bilgisi;**__

    \`Rolleri:\` ${member.roles.cache.size > 8 ? `Çok fazla rolün mevcut (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
    \`Takma İsim:\` **${member.displayName.replace("`", "")}**
    \`Katılma Tarihi:\` **${moment(member.joinedAt).format("DD/MM/YY HH:mm:ss")}**

    __**Kayıt Bilgileri;**__

    ${kayitBilgi}
    `));
    
};

module.exports.configuration = {
    name: "info",
    aliases: ["bilgi", "i", "kullanici"],
    usage: "info / info @üye",
    description: "Belirtilen üyenin bilgilerine bakarsınız."
};
