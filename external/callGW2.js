"use strict";
const request = require("request");
const auth = require("../config/guild.json");
const fs = require('fs');
const IsJsonString = require('../helpers/isJson');

// Local vars
let gw2api = "api.guildwars2.com";
let guildLogEP = "/v2/guild/" + auth.guild_id + "/log";

//File Info
let appDir = __dirname.replace("\external","");
let guildLogFile = appDir + "db/guildlog.json";
let guildLog = require(guildLogFile);

// Helper functions
let writeLogs = (data, body) => {
    fs.writeFile(guildLogFile, JSON.stringify(data.concat(guildLog)), "utf8", function(){
        console.log("Appended data.") 
    });
};

let formatTime = (date) => {
    /* Time Formatting */
    let time = new Date(date);
    // Ex: Sun, Aug 24 2016 at 4:30PM Server Time
    let week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let hm = time.getUTCHours() < 12 ? time.getUTCHours() + ":" + time.getUTCMinutes() + "AM" : time.getUTCHours() - 12 + ":" + time.getUTCMinutes() + "PM";
    let dateText = week[time.getUTCDay()] + ", " + month[time.getUTCMonth()] + " " + time.getUTCDate() + " " + time.getUTCFullYear() + " at " + hm + " Server Time"; 
    
    return dateText;
};

let filterType = (data, type) => {
    let motds = data.filter(function(v, i, arr){
        return v.type === type;
    });
    return motds;
};

let getMostRecent = (data, type) => {
    // Filter new data
    let filtered = filterType(data, type);
    // Go through old if no new items
    if (filtered.length === 0) filtered = filterType(guildLog, type);

    return filtered[0];
};

//Motd functions

let formatMotd = (motd) => {
    return motd.motd + '\n-- Posted by ' + motd.user + ' on ' + formatTime(motd.time);
};

// Kick functions
let kickMessages = (data) => {
    let kicks_new = filterType(data, "kick"),
        messages = [];

    for (let kick of kicks_new){
        let message,
            time = formatTime(kick.time);

        message = kick.user === kick.kicked_by ? 
            kick.user + " left KnT on " + time :
            kick.user + " was kicked by " + kick.kicked_by + " on " + time;

        messages.push(message);
    }

    return messages;
};

let callGW2 = (endpoint, authenticated, type) => {
    return new Promise((resolve, reject) => {

        // Get most recent log id.
        let since = guildLog[0] ? "&since=" + guildLog[0].id : "",
            access = authenticated ? "?access_token=" + auth.guild_leader_token : "";
        
        request("https://" + gw2api + endpoint + access + since , function(error, response, body){
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                writeLogs(data, body);
                switch (type) {
                    case "motd":
                        return resolve(formatMotd(getMostRecent(data, "motd")));
                        break;
                    case "kicks":
                        return resolve(kickMessages(data));
                        break;
                    default:
                        writeLogs(data, body);
                        break;
                }
            } else {
                let err = {"ERROR" : error || body};
                console.log(err);
                return reject(err);
            }
        });
    });
}

module.exports = {
    getLogs : function(type){
        return callGW2(guildLogEP, true, type);
    }
}