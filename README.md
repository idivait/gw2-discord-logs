# Setup

Create two files under config with these options:

````
# discord.json
{
    "bot_token": "YOUR_BOT_TOKEN",
    "kick_webhook_url": "KICK_CHANNEL_WEBHOOK_URL",
    "motd_channel_id" : "ID_FOR_YOUR_MOTD_CHANNEL"
}
````

````
# guild.json
{
    "guild_leader_token" : "YOUR_GUILD_LEADER_API_KEY", // Create a key at https://account.arena.net/applications/create with Guild checked. Must be a guild leader account.
    "guild_id" : "FROM_THE_GUILD_DETAILS_API" // https://api.guildwars2.com/v1/guild_details.json?guild_name=YOUR_GUILD_NAME
}
````

# Discord Token and Channel IDs
Check this out: https://github.com/Chikachi/DiscordIntegration/wiki/How-to-get-a-token-and-channel-ID-for-Discord

# Webhook URL
Check this out: https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks