const baseEP = "https://discordapp.com/api";
const request = require('request');
const discord = require('../config/discord.json');

module.exports = (channelID, topic)=>{
    
    let discordToken = discord.bot_token;
    let patch = {
        topic: topic
    };
    request({
        url: baseEP + '/channels/' + channelID,
        method: "PATCH",
        headers: {
            "Authorization": "Bot " + discordToken,
            "content-type": "application/json"
        },
        body: JSON.stringify(patch)
    }, function(err, response, body){
        if (err) console.error(error);
        console.log(body);
    });
};