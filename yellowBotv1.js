const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const streamOptions = { seek: 0, volume: 1 };

ffmpeg_options = {
  options: "-vn",
  before_options: "-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5",
};

const bot = new Discord.Client();

const token =
  "MTAzNDU3NDk3NDUyNDA4NDMyNQ.G_GinV.5GNxfAvbTHUUJSC0uz6wkOfjnkzMD8S3mcxixY";

bot.login(token);

bot.on("ready", () => {
  console.log("Bot Ready");
});

bot.on("message", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content.toLowerCase().startsWith("?chupalupo")) {
    let VoiceChannel = msg.guild.channels.cache.find(
      (channel) =>
        channel.id === "1034575452364353630" ||
        channel.id === "865304633042665522"
    );

    if (VoiceChannel == null) {
      console.log("Canal não foi encontrado");
    }

    if (VoiceChannel !== null) {
      console.log("Canal encontrado");

      VoiceChannel.join()
        .then((connection) => {
          const stream = ytdl(msg.content.substr(11), { filter: "audioonly" });

          const DJ = connection.play(stream, streamOptions);
          DJ.on("end", () => {
            VoiceChannel.leave();
          });
        })
        .catch(console.error);
    }
  }
});
