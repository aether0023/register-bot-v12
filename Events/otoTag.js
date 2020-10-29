const { Discord, MessageEmbed } = require('discord.js');
const ayar = require('../settings.json');

module.exports = (oldUser, newUser) => {

    if (oldUser.bot || newUser.bot) return;
        let sunucu = client.guilds.cache.get(ayar.sunucuID);
        let logKanal = sunucu.channels.cache.get(ayar.otoTagLogKanal);
        let member = sunucu.members.cache.get(oldUser.id);
        let embed = new MessageEmbed().setTitle(member.user.username, member.user.avatarURL({dynamic: true})).setTimestamp().setFooter(sunucu.name).setColor("GREEN")
        let embed1 = new MessageEmbed().setTitle(member.user.username, member.user.avatarURL({dynamic: true})).setTimestamp().setFooter(sunucu.name).setColor("RED")

        if (!oldUser.username.includes(ayar.tag) && newUser.username.includes(ayar.tag)) {
            if (member.manageable) {
                    member.roles.add(ayar.ekipRolu);
                        if (logKanal) { logKanal.send(embed.setDescription(`${member} adlı üye tagımızı aldığı için kendisine ekip rolü verildi.`)) }else{ member.send(`**${sunucu.name}** adlı sunucumuzda tagımızı aldığın için ekip rolü kazandın.`).catch() }
            }
        };

        if (oldUser.username.includes(ayar.tag) && !newUser.username.includes(ayar.tag)) {
             if (member.manageable) {
                 if (!member.roles.cache.has(ayar.kayitSorumlusu)) {
                     member.roles.remove(ayar.ekipRolu);
                     if (logKanal) { logKanal.send(embed1.setDescription(`${member} adlı üye tagımızı bıraktığı için kendisinden ekip rolü alındı.`)) }else{ member.send(`**${sunucu.name}** adlı sunucumuzda tagımızı bıraktığın için ekip rolünü kaybettin.`).catch() }
                    }else{
                        if (member.roles.cache.has(ayar.erkekRol1)) {
                            if (logKanal) { logKanal.send(embed1.setDescription(`${member} adlı yetkili tagımızı bıraktığı için kendisinden ekip rolü ve yetkileri alındı.`)) }else{ member.send(`**${sunucu.name}** sunucumuzda tagımızı saldığın için yetkilerin alındı.`).catch() }
                        member.roles.cache.has(ayar.boosterRol) ? member.roles.set([ayar.boosterRol, ayar.erkekRol1]) : member.roles.set([ayar.erkekRol1]);
                        return;
                        }
                        if (member.roles.cache.has(ayar.kadinRol1)) {
                            if (logKanal) { logKanal.send(embed1.setDescription(`${member} adlı yetkili tagımızı bıraktığı için kendisinden ekip rolü ve yetkileri alındı.`)) }else{ member.send(`**${sunucu.name}** sunucumuzda tagımızı saldığın için yetkilerin alındı.`).catch() }
                            member.roles.cache.has(ayar.boosterRol) ? member.roles.set([ayar.boosterRol, ayar.kadinRol1]) : member.roles.set([ayar.kadinRol1]);
                            return;
                        }
                    }
             }
        }

};

module.exports.configuration = {
    name: "userUpdate"
  }