//internal modules
const callGW2 = require("../external/callGW2");
const discordWH = require("../external/discordWH.js");
const changeChannelTopic = require("../external/changeChannelTopic.js");

// Configure IDs for API usage
const discord = require("../config/discord.json");
const guild = require("../config/guild.json");

module.exports =  ()=>{
    callGW2.getLogs("kicks").then(messages => {
        if (messages.length > 0) discordWH(messages, discord.kick_webhook_url);
    });
    callGW2.getLogs("motd").then(motd => {
        changeChannelTopic(discord.motd_channel_id, motd);
    });
    console.log("beep");
};