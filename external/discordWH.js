/***
 * Discord Webhook Structure POST
 * {
 *  content: Message content(string),
 *  OR
 *  file: Message contents as file (file contents)
 *  OR
 *  embeds: Array of embed objects 
 *  username: Override default username(string),
 *  avatar_url: Override default icon(string),
 *  tts: true if tts (bool)
 * }
 */
let request = require('request');

// Takes the mesage and posts it to the kickchannel
module.exports = (messages, channel)=>{
    //Local vars
    let post = {
        content: 'No message to send',
        username: 'Kickbot'
    };
    
    for (let message of messages) {
        post.content = message;
        request({
            url: channel,
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(post)
        })
    }
}
