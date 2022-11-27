const Discord = require("discord.js")

const { GatewayIntentBits } = require('discord.js');

const config = require("./config.json")

const client = new Discord.Client({ 
  intents: [ 
GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions
       ]
    });

const db = require("quick.db")

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler/index.js')(client)
require('./events/events.js')(client)
client.login(config.token)

