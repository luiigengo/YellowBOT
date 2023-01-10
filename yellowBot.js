require("dotenv/config");

const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const axios = require("axios");

const bot = new Discord.Client();
const { EmbedBuilder } = require("discord.js");
const PREFIX = "?";
const version = "1.0.3";
const token = process.env.TOKEN;

const streamOptions = { seek: 0, volume: 1 };
ffmpeg_options = {
  options: "-vn",
  before_options: "-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5",
};

bot.login(token);

bot.on("ready", () => {
  console.log("Bot Ready");
});

bot.on("message", async (msg) => {
  if (msg.author.bot) {
    return;
  }

  let args = msg.content.substring(PREFIX.length).split(" ");

  if (msg.author.discriminator === "3046") {
    msg.channel.send("Lupo fraco");
    return;
  }

  switch (args[0]) {
    case "kanye":
      const phrase = await axios.get("https://api.kanye.rest/");
      const { quote } = phrase.data;
      msg.channel.send(`Kanye: "${quote}"`);
      break;

    case "play":
      let VoiceChannel = msg.guild.channels.cache.find(
        (channel) =>
          channel.id === "1034575452364353630" ||
          channel.id === "865304633042665522" ||
          channel.id === "865303307513495596" ||
          channel.id === "865304162970238996" ||
          channel.id === "865306741682864189" ||
          channel.id === "1024080639789637733"
      );

      if (VoiceChannel == null) {
        console.log("Canal não foi encontrado");
      }

      if (VoiceChannel !== null) {
        console.log("Canal encontrado");

        VoiceChannel.join()
          .then((connection) => {
            const stream = ytdl(args[1], {
              filter: "audioonly",
              dlChunkSize: 0,
              quality: "highestaudio",
              highWaterMark: 1 << 25,
            });

            const DJ = connection.play(stream, streamOptions);
            DJ.on("end", () => {
              VoiceChannel.leave();
            });
          })
          .catch(console.error);
      }
      break;

    case "embed":
      const embedMessage = new Discord.MessageEmbed()
        .setColor("0xFIC40F")
        .setTitle("User Information")
        .addField("User Name", msg.author.username);

      msg.channel.send(embedMessage);
      break;

    case "info":
      if (args[1] === "version") {
        msg.channel.send("Version: " + version);
      } else {
        msg.channel.send("Info requires a second argument");
      }
      break;

    case "clear":
      if (!args[1]) {
        return msg.channel.send(
          "Insert how many messages you wanna delete.. ex: ?clear 4(This will delete the last 4 messages"
        );
      }
      msg.channel.bulkDelete(args[1]);
      break;
    default:
      break;
  }
});
