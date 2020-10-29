const Discord = require('discord.js');
const ayar = require("../settings.json");
module.exports = (message) => {

    if (message.content.toLowerCase() === "tag") {
        message.channel.send(`${ayar.tag}`)
    };

    if (message.content.toLowerCase() == "sa" || message.content.toLowerCase() === "sea" || message.content.toLowerCase() === "selam") {
        message.reply("Aleyküm selam kardeşim, hoşgeldin.")
    };

};

module.exports.configuration = {
    name: "message"
  }